// SPDX-License-Identifier: Apache-2.0

#include <libwebsockets.h>
#include <signal.h>
#include <string.h>

#define LWS_PLUGIN_STATIC
#include "protocol_lws_minimal.c"

static struct lws_protocols protocols[] = {
    {"http", lws_callback_http_dummy, 0, 0, 0, NULL, 0},
    LWS_PLUGIN_PROTOCOL_MINIMAL,
    LWS_PROTOCOL_LIST_TERM
};

static const lws_retry_bo_t retry = {
    .secs_since_valid_ping = 3,
    .secs_since_valid_hangup = 10,
};

static int interrupted;

void sigint_handler(int sig) { interrupted = 1; }

void lws_connect() {
  struct lws_context_creation_info info;
  struct lws_context *context;
  const char *p;
  int n = 0, logs = LLL_USER | LLL_ERR | LLL_WARN | LLL_NOTICE
      /* for LLL_ verbosity above NOTICE to be built into lws,
       * lws must have been configured and built with
       * -DCMAKE_BUILD_TYPE=DEBUG instead of =RELEASE */
      /* | LLL_INFO */ /* | LLL_PARSER */ /* | LLL_HEADER */
      /* | LLL_EXT */ /* | LLL_CLIENT */  /* | LLL_LATENCY */
      /* | LLL_DEBUG */;

  signal(SIGINT, sigint_handler);
  memset(&info, 0, sizeof info);
  info.port = 7681;
  info.protocols = protocols;
  info.vhost_name = "localhost";

  /* LWS TLS here */
  context = lws_create_context(&info);
  if (!context) {
    lwsl_err("Error: lws init failed\n");
    exit(1);
  }

  while (n >= 0 && !interrupted) n = lws_service(context, 0);

  lws_context_destroy(context);
}


int main() {
  lws_connect();
}
