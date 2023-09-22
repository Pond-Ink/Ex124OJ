/// <reference path="index.d.ts" />

import { isHomepage, isSubmission, isContests, isStandings, isProblem, isUserProfile, isBlog, isContest } from "./utils";
import { getVariables } from "./variables";
import { Theme } from "./theme";
import { Settings } from "./settings";
import { NameStyle } from "./name";
import { Background, changeIcon } from "./appearance";
import { DiscussionCard } from "./discussion";
import { CodeCopy } from "./code";
import { TableStyle } from "./table";
import { RandomProblem } from "./toolbar";
import { exAnnouncements } from "./announcement";
import { Submission } from "./submission";
import { ContestsCard, ContestHome, ContestStandings } from "./contest";
import { Problem } from "./problem";
import { changeGravatarURL } from "./gravatar";

(function() {
    'use strict';

    getVariables();

    Theme();
    NameStyle();

    document.addEventListener('DOMContentLoaded', () => {
        Settings();
        Background();
        changeIcon();
        DiscussionCard();
        CodeCopy();
        TableStyle();
        RandomProblem();
        if (isHomepage()) exAnnouncements();
        if (isSubmission()) Submission();
        if (isContests()) ContestsCard();
        if (isContest()) ContestHome();
        if (isProblem()) Problem();
        if (isUserProfile() || isBlog()) changeGravatarURL();  
    });

    window.onload = () => {
        if (isStandings()) ContestStandings();
    };
})();