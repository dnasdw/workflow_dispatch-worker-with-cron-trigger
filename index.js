// references:
//   github actions:
//     https://docs.github.com/actions/learn-github-actions/events-that-trigger-workflows#workflow_dispatch
//     https://docs.github.com/rest/reference/actions#create-a-workflow-dispatch-event

// https://docs.github.com/rest/overview/resources-in-the-rest-api
const GITHUB_API_URL = "https://api.github.com";

addEventListener('scheduled', event => {
  event.waitUntil(triggerEvent(event.scheduledTime))
})

async function triggerEvent(scheduledTime) {
  await fetch(`${GITHUB_API_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW_FILE_NAME}/dispatches`, {
    method: "POST",
    headers: {
      "Authorization": `token ${GITHUB_TOKEN}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "Cloudflare-Workers"
    },
    body: JSON.stringify({
      "ref": `${GITHUB_BRANCH}`,
      "inputs": {
        "trigger": "continue"
      }
    })
  });
}
