/// <reference path="index.d.ts" />

import { isHomepage, isSubmission, isContests, isStandings, isProblem, isUserProfile, isBlog } from "./utils";
import { getVariables } from "./variables";
import { DarkenTheme } from "./darkentheme";
import { Settings } from "./settings";
import { NameColor, NameBadge } from "./name";
import { FontAwesome } from "./fontawesome";
import { Background, changeIcon } from "./appearance";
import { DiscussionCard } from "./discussion";
import { CodeBlock } from "./code";
import { TableStyle } from "./table";
import { RandomProblem } from "./toolbar";
import { exAnnouncements } from "./announcement";
import { Submission } from "./submission";
import { ContestsCard, ContestStandings } from "./contest";
import { downloadData } from "./problem";
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

    DarkenTheme();
    FontAwesome();

    document.addEventListener('DOMContentLoaded', () => {
        Background();
        changeIcon();
        DiscussionCard();
        CodeBlock();
        TableStyle();
        RandomProblem();
        if (isHomepage()) exAnnouncements();
        if (isSubmission()) Submission();
        if (isContests()) ContestsCard();
        if (isProblem()) downloadData();
        if (isUserProfile() || isBlog()) changeGravatarURL();  
    });

    window.onload = () => {
        flag = true;
        if (isStandings()) ContestStandings();
    };
})();