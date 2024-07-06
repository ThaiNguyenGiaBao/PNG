import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: "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",
});

const orgName = "TickLabVN";

const data = await octokit.rest.activity.listStargazersForRepo({
  owner: orgName,
  repo: 'tonic',
});

console.log(data);