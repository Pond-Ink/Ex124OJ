const HomepageRegExp = /^http:\/\/124.221.194.184(\/)?(\?.*)?$/;
export function isHomepage() {
    return window.location.href.match(HomepageRegExp);
}

const submissionRegExp = /^http:\/\/124.221.194.184\/submission\/(\d+)(\?.*)?$/;
export function isSubmission() {
    return window.location.href.match(submissionRegExp);
}

const ContestsRegExp = /^http:\/\/124.221.194.184\/contests(\?.*)?$/;
export function isContests() {
    return window.location.href.match(ContestsRegExp);
}

const ContestRegExp = /^http:\/\/124.221.194.184\/contest\/(\d+)(\?.*)?$/;
export function isContest() {
    return window.location.href.match(ContestRegExp);
}

const StandingsRegExp = /^http:\/\/124.221.194.184\/contest\/(\d+)\/standings(\?.*)?$/;
export function isStandings() {
    return window.location.href.match(StandingsRegExp);
}

const ProblemRegExp = /^http:\/\/124.221.194.184(\/contest\/(\d+))?\/problem\/(\d+)(\?.*)?$/;
export function isProblem() {
    return window.location.href.match(ProblemRegExp);
}

const UserProfileRegExp = /^http:\/\/124.221.194.184\/user\/profile\/.+(\?.*)?$/;
export function isUserProfile() {
    return window.location.href.match(UserProfileRegExp);
}

const BlogRegExp = /^http:\/\/124.221.194.184\/blog\/.+(\?.*)?$/;
export function isBlog() {
    return window.location.href.match(BlogRegExp);
}