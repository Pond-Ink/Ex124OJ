/// <reference path="index.d.ts" />

import { isHomepage, isSubmission, isProblem, isUserProfile, isBlog } from "./utils";
import { getVariables } from "./variables";
import { Settings } from "./settings";
import { NameColor, NameBadge } from "./name";
import { FontAwesome } from "./fontawesome";
import { Background, changeIcon } from "./appearance";
import { DiscussionCard } from "./discussion";
import { CodeBlock } from "./code";
import { TableStyle } from "./table";
import { RandomProblem } from "./toolbar";
import { exAnnouncements } from "./announcement";
import { SubmissionCard } from "./submission";
import { downloadData } from "./problem";
import { changeGravatarURL } from "./gravatar";

(function() {
    'use strict';

    getVariables(() => {
        Settings();
        NameColor();
        NameBadge(); 
    });
    FontAwesome();
    Background();
    changeIcon();
    DiscussionCard();
    CodeBlock();
    TableStyle();
    RandomProblem();
    if (isHomepage()) exAnnouncements();
    if (isSubmission()) SubmissionCard();
    if (isProblem()) downloadData();
    if (isUserProfile() || isBlog()) changeGravatarURL();
})();