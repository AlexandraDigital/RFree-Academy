/**
 * Converts a GitHub file URL to a clean GitHub Pages URL.
 * 
 * GitHub URL:  https://github.com/AlexandraDigital/RFree-Academy/blob/main/lessons/intro.md
 * Pages URL:   https://alexandradigital.github.io/RFree-Academy/lessons/intro.md
 *
 * GitHub Pages must be enabled on the repository for the converted URL to work.
 * Go to: Settings → Pages → Source → Deploy from branch (main)
 */
export function convertToGitHubPagesUrl(githubUrl: string): string {
  if (!githubUrl) return '';
  try {
    // Match: https://github.com/OWNER/REPO/blob/BRANCH/path/to/file
    const match = githubUrl.match(
      /https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/[^/]+\/(.+)/
    );
    if (match) {
      const [, owner, repo, filePath] = match;
      return `https://${owner.toLowerCase()}.github.io/${repo}/${filePath}`;
    }

    // Match: https://github.com/OWNER/REPO/tree/BRANCH/path (folder)
    const treeMatch = githubUrl.match(
      /https?:\/\/github\.com\/([^/]+)\/([^/]+)\/tree\/[^/]+\/(.+)/
    );
    if (treeMatch) {
      const [, owner, repo, folderPath] = treeMatch;
      return `https://${owner.toLowerCase()}.github.io/${repo}/${folderPath}`;
    }

    // If it's already a github.io URL or unrecognized format, return as-is
    return githubUrl;
  } catch {
    return githubUrl;
  }
}

/**
 * Returns true if the URL is a raw GitHub URL (github.com domain)
 */
export function isGitHubUrl(url: string): boolean {
  return /https?:\/\/(www\.)?github\.com\//.test(url);
}
