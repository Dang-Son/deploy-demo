import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

// const { PassThrough } = require("stream");

const { Response } = require("@remix-run/node");

const { RemixServer } = require("@remix-run/react");

// const isbot = require("isbot");

// const { renderToPipeableStream } = require("react-dom/server");

// const ABORT_DELAY = 5000;

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  const sheet = new ServerStyleSheet();

  let markup = renderToString(
    sheet.collectStyles(
      <RemixServer context={remixContext} url={request.url} />
    )
  );
  const styles = sheet.getStyleTags();
  markup = markup.replace("__STYLES__", styles);
  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// function handleBotRequest(
//   request,
//   responseStatusCode,
//   responseHeaders,
//   remixContext
// ) {
//   return new Promise((resolve, reject) => {
//     let didError = false;

//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer context={remixContext} url={request.url} />,
//       {
//         onAllReady() {
//           const body = new PassThrough();

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(body, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error) {
//           reject(error);
//         },
//         onError(error) {
//           didError = true;

//           console.error(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

// function handleBrowserRequest(
//   request,
//   responseStatusCode,
//   responseHeaders,
//   remixContext
// ) {
//   return new Promise((resolve, reject) => {
//     let didError = false;

//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer context={remixContext} url={request.url} />,
//       {
//         onShellReady() {
//           const body = new PassThrough();

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(body, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(err) {
//           reject(err);
//         },
//         onError(error) {
//           didError = true;

//           console.error(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }
