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

    getVariables(() => {
        const tasks = () => {
            Settings();
            NameColor();
            NameBadge(); 
        };
        if (document.readyState === "complete" || document.readyState === "interactive") {
            tasks();
        } else {
            document.addEventListener("DOMContentLoaded", () => {
                tasks();
            });
        }
    });

    DarkenTheme();

    document.addEventListener('DOMContentLoaded', () => {
        FontAwesome();
        Background();
        changeIcon();
        DiscussionCard();
        CodeBlock();
        TableStyle();
        RandomProblem();
        if (isHomepage()) exAnnouncements();
        if (isSubmission()) Submission();
        if (isContests()) ContestsCard();
        if (isStandings()) ContestStandings();
        if (isProblem()) downloadData();
        if (isUserProfile() || isBlog()) changeGravatarURL();
    });
})();