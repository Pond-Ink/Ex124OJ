import { version, BackgroundImage, SiteIconImage, SiteIconSmallImage, Academic } from "./variables";

export function Settings() {
    GM_addStyle(
`.settings-overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    transition: visibility 0.4s, background 0.4s;
    top: 0;
    left: 0;
    visibility: hidden;
    z-index: 229;
}
.settings-popup-active .settings-overlay {
    background: rgb(0,0,0,.3);
    visibility: visible;
}
.settings-popup {
    width: 60%;
    position: relative;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    visibility: hidden;
    border-radius: .5rem;
    padding: 20px 20px;
}
.settings-popup-active .settings-overlay .settings-popup {
    background: #ffffff;
    visibility: visible;
}
.settings-popup .row {
    padding: 0 30px 30px;
}
.settings-titlebar {
    padding: 10px 20px 30px 20px !important;
}
.settings-titlebar h4 {
    position: relative;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
}
.settings-footerbar {
    height: 60px;
    padding: 20px 20px;
}`);

    const HomepageEntrance = document.createElement('li');
    const NavBarTablist = document.querySelector('div[role=main] > div > ul[role=tablist]');
    NavBarTablist!.insertBefore(HomepageEntrance, NavBarTablist!.firstChild);
    HomepageEntrance.setAttribute('class', 'nav-item');
    HomepageEntrance.innerHTML = '<span style="padding: 0.5rem 1rem; cursor:pointer"><span style="background-color: #28adca;padding:0.2em 0.6em;border-radius: 1em;color:#fff;font-size: 0.7em;font-weight:bold;display:inline-block;position: relative;top: 50%;transform: translate(0,-50%);">Ex124OJ</span></span>';
    HomepageEntrance.onclick = function() {
        document.body.setAttribute('class', 'settings-popup-active');
    }
    const SettingsOverlay = document.createElement('div');
    document.body.insertBefore(SettingsOverlay, document.body.firstChild);
    SettingsOverlay.setAttribute('class', 'settings-overlay');
    const SettingsPopup = document.createElement('div');
    SettingsOverlay.appendChild(SettingsPopup);
    SettingsPopup.setAttribute('class', 'settings-popup');
    const SettingsTitlebar = document.createElement('div');
    SettingsPopup.appendChild(SettingsTitlebar);
    SettingsTitlebar.setAttribute('class', 'row settings-titlebar');
    SettingsTitlebar.innerHTML = '<h3 style="width:100%;height:3.5rem"><img src="https://ex124oj.pond.ink/images/icon.png" style="height:3.5rem;width:3.5rem;margin-right:10px"><span style="vertical-align:middle"> Ex124OJ 控制面板</span> <span style="vertical-align:middle;cursor:pointer;margin:0 10px" onclick="window.open(\'https://ex124oj.pond.ink/\');"><span style="height:1.75rem;line-height:3.5rem;vertical-align:middle;padding:0 .5rem;background-color:#28adca;border-radius:1em;color:#fff;font-size:1.2rem;font-weight:bold">Ex124OJ</span></span><span style="color:#7f7f7f;line-height:3.5rem;vertical-align:middle;font-size:1.2rem">' + version + '</span></h3>';
    const SettingsCloseButton = document.createElement('span');
    SettingsPopup.appendChild(SettingsCloseButton);
    SettingsCloseButton.setAttribute('style', 'position: fixed;right: 20px;top:20px;cursor: pointer');
    SettingsCloseButton.setAttribute('onclick', 'document.body.setAttribute(\'class\', \'\');');
    SettingsCloseButton.innerHTML = '<h4><i class="fa fa-xmark"></i></h4>';

    const background = document.createElement('div');
    SettingsPopup.appendChild(background);
    background.setAttribute('class', 'row');
    const backgroundImageLabel = document.createElement('strong');
    background.appendChild(backgroundImageLabel);
    backgroundImageLabel.setAttribute('style', 'font-size: 1.25em');
    backgroundImageLabel.innerHTML = '背景图片&emsp;&emsp;&emsp;&emsp;';
    const backgroundImageInput = document.createElement('input');
    background.appendChild(backgroundImageInput);
    backgroundImageInput.setAttribute('style', 'flex-grow: 1; height: 2em; width: initial');
    backgroundImageInput.setAttribute('class', 'form-control');

    const siteIcon = document.createElement('div');
    SettingsPopup.appendChild(siteIcon);
    siteIcon.setAttribute('class', 'row');
    const siteIconImageLabel = document.createElement('strong');
    siteIcon.appendChild(siteIconImageLabel);
    siteIconImageLabel.setAttribute('style', 'font-size: 1.25em');
    siteIconImageLabel.innerHTML = '网站图标&emsp;&emsp;&emsp;&emsp;';
    const siteIconImageInput = document.createElement('input');
    siteIcon.appendChild(siteIconImageInput);
    siteIconImageInput.setAttribute('style', 'flex-grow: 1; height: 2em; width: initial');
    siteIconImageInput.setAttribute('class', 'form-control');

    const siteIconSmall = document.createElement('div');
    SettingsPopup.appendChild(siteIconSmall);
    siteIconSmall.setAttribute('class', 'row');
    const siteIconSmallImageLabel = document.createElement('strong');
    siteIconSmall.appendChild(siteIconSmallImageLabel);
    siteIconSmallImageLabel.setAttribute('style', 'font-size: 1.25em');
    siteIconSmallImageLabel.innerHTML = '网站图标（小）&emsp;';
    const siteIconSmallImageInput = document.createElement('input');
    siteIconSmall.appendChild(siteIconSmallImageInput);
    siteIconSmallImageInput.setAttribute('style', 'flex-grow: 1; height: 2em; width: initial');
    siteIconSmallImageInput.setAttribute('class', 'form-control');

    const academic = document.createElement('div');
    SettingsPopup.appendChild(academic);
    academic.setAttribute('class', 'row');
    academic.setAttribute('style', 'line-height: 2.5em;vertical-align: middle');
    const academicLabel = document.createElement('strong');
    academic.appendChild(academicLabel);
    academicLabel.setAttribute('style', 'font-size: 1.25em');
    academicLabel.innerHTML = '学术模式&emsp;&emsp;&emsp;&emsp;';
    const academicOff = document.createElement('div');
    academic.appendChild(academicOff);
    academicOff.innerHTML = '<input type="radio" id="AcademicOff"> 关闭&emsp;';
    const academicOn = document.createElement('div');
    academic.appendChild(academicOn);
    academicOn.innerHTML = '<input type="radio" id="AcademicOn"> 开启&emsp;';
    (document.getElementById('AcademicOff') as HTMLInputElement).onclick = function() {
        (document.getElementById('AcademicOn') as HTMLInputElement).checked = false;
    };
    (document.getElementById('AcademicOn') as HTMLInputElement).onclick = function() {
        (document.getElementById('AcademicOff') as HTMLInputElement).checked = false;
    };

    backgroundImageInput.value = BackgroundImage;
    siteIconImageInput.value = SiteIconImage;
    siteIconSmallImageInput.value = SiteIconSmallImage;
    (document.getElementById('AcademicOff') as HTMLInputElement).checked = !Academic;
    (document.getElementById('AcademicOn') as HTMLInputElement).checked = Academic;

    const FooterRow = document.createElement('div');
    FooterRow.setAttribute('class', 'settings-footerbar');
    SettingsPopup.appendChild(FooterRow);
    const Ok = document.createElement('button');
    FooterRow.appendChild(Ok);
    Ok.setAttribute('class', 'btn btn-search btn-outline-primary float-right');
    Ok.innerHTML = '保存';
    Ok.onclick = function() {
        GM_setValue('BackgroundImage', backgroundImageInput.value);
        GM_setValue('SiteIconImage', siteIconImageInput.value);
        GM_setValue('SiteIconSmallImage', siteIconSmallImageInput.value);
        GM_setValue('Academic', (document.getElementById('AcademicOn') as HTMLInputElement).checked);
        location.reload();
    };
    const Clear = document.createElement('button');
    FooterRow.appendChild(Clear);
    Clear.setAttribute('class', 'btn btn-search btn-outline-primary float-right');
    Clear.innerHTML = '恢复默认';
    Clear.onclick = function() {
        const values = GM_listValues();
        for (const value in values) {
            GM_deleteValue(values[value]);
        }
        location.reload();
    }
}