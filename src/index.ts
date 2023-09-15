/// <reference path="index.d.ts" />

import { isHomepage, isSubmission, isContests, isStandings, isProblem, isUserProfile, isBlog, isContest } from "./utils";
import { getVariables } from "./variables";
import { Theme } from "./theme";
import { Settings } from "./settings";
import { NameColor, NameBadge } from "./name";
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

    let flag = false;

    getVariables(() => {
        const tasks = () => {
            Settings();
            NameColor();
            NameBadge(); 
        };
        if (flag) {
            tasks();
        } else {
            window.onload = () => {
                tasks();
                if (isStandings()) ContestStandings();
            };
        }
    });

    Theme();

    document.addEventListener('DOMContentLoaded', () => {
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
        flag = true;
        if (isStandings()) ContestStandings();
    };
})();