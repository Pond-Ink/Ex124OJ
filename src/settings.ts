import { version, BackgroundImage, SiteIconImage, Academic, Ligatures, Darktheme, DarkthemeSelect } from "./variables";

export function Settings() {
    GM_addStyle(`
.settings-overlay {
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
    background: ${Darktheme ? 'rgb(255,255,255,.3)' : 'rgb(0,0,0,.3)'};
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
    background: ${Darktheme ? '#222' : '#ffffff'};
    visibility: visible;
}
.settings-popup .row {
    padding: 0 30px 30px;
}
.settings-popup .row * {
    margin-bottom: 0;
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
}
.switch {
    position: relative;
    vertical-align: middle;
    width: 60px;
    height: 28px;
}
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.settings-popup-active .slider {
    position: absolute;
    visibility: visible;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${Darktheme ? '#333' : '#ccc'};
    transition: background-color .4s;
    transition: visiblility 0s;
    border-radius: 28px;
}
.settings-popup-active .slider:before {
    position: absolute;
    visibility: visible;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: ${Darktheme ? '#222' : '#ffffff'};
    transition: .4s;
    border-radius: 50%;
}
input:checked + .slider {
    background-color: #28ADCA;
}
input:checked + .slider:before {
    transform: translateX(32px);
}`);

    const HomepageEntrance = document.createElement('li');
    const NavBarTablist = document.querySelector('div[role=main] > div > ul[role=tablist]');
    NavBarTablist!.insertBefore(HomepageEntrance, NavBarTablist!.firstChild);
    HomepageEntrance.setAttribute('class', 'nav-item');
    HomepageEntrance.innerHTML = '<span style="padding: 0.5rem 1rem; cursor:pointer"><span style="background-color: #28adca;padding:0.2em 0.6em;border-radius: 1em;color:#fff;font-size: 0.7em;font-weight:bold;display:inline-block;position: relative;top: 50%;transform: translate(0,-50%);">Ex124OJ</span></span>';
    HomepageEntrance.onclick = function () {
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

    const Switchs = document.createElement('div');
    SettingsPopup.appendChild(Switchs);
    Switchs.setAttribute('class', 'row');

    const academic = document.createElement('div');
    Switchs.appendChild(academic);
    const academicLabel = document.createElement('strong');
    academic.appendChild(academicLabel);
    academicLabel.setAttribute('style', 'font-size: 1.25em; vertical-align: middle;');
    academicLabel.innerHTML = '学术模式&emsp;&emsp;&emsp;&emsp;';
    const academicSwitch = document.createElement('label');
    academicSwitch.className = 'switch';
    academic.appendChild(academicSwitch);
    academicSwitch.innerHTML = '<input type="checkbox" id="AcademicSwitch" style="display: none;">\n<i id="AcademicSwitchIcon" class="slider"></i>';

    { const space = document.createElement('p'); Switchs.appendChild(space); space.innerHTML = '&emsp;&emsp;&emsp;&emsp;' }

    const ligatures = document.createElement('div');
    Switchs.appendChild(ligatures);
    const ligaturesLabel = document.createElement('strong');
    ligatures.appendChild(ligaturesLabel);
    ligaturesLabel.setAttribute('style', 'font-size: 1.25em; vertical-align: middle;');
    ligaturesLabel.innerHTML = '代码连字&emsp;&emsp;&emsp;&emsp;';
    const ligaturesSwitch = document.createElement('label');
    ligaturesSwitch.className = 'switch';
    ligatures.appendChild(ligaturesSwitch);
    ligaturesSwitch.innerHTML = '<input type="checkbox" id="LigaturesSwitch" style="display: none;">\n<i id="LigaturesSwitchIcon" class="slider"></i>';

    { const space = document.createElement('p'); Switchs.appendChild(space); space.innerHTML = '&emsp;&emsp;&emsp;&emsp;' }

    const darktheme = document.createElement('div');
    Switchs.appendChild(darktheme);
    const darkthemeLabel = document.createElement('strong');
    darktheme.appendChild(darkthemeLabel);
    darkthemeLabel.setAttribute('style', 'font-size: 1.25em; vertical-align: middle;');
    darkthemeLabel.innerHTML = '主题风格&emsp;&emsp;&emsp;&emsp;';
    const darkthemeSelect = document.createElement('select');
    darktheme.appendChild(darkthemeSelect);
    darkthemeSelect.classList.add('form-control');
    darkthemeSelect.style.display = 'inline-block';
    darkthemeSelect.style.width = 'unset';
    darkthemeSelect.style.verticalAlign = 'middle';
    darkthemeSelect.innerHTML = '<option value="follow">跟随系统</option><option value="light">Light</option><option value="dark">Dark</option>';

    backgroundImageInput.value = BackgroundImage;
    siteIconImageInput.value = SiteIconImage;
    (document.getElementById('AcademicSwitch') as HTMLInputElement).checked = Academic;
    (document.getElementById('LigaturesSwitch') as HTMLInputElement).checked = Ligatures;
    darkthemeSelect.value = DarkthemeSelect;

    const FooterRow = document.createElement('div');
    FooterRow.setAttribute('class', 'settings-footerbar');
    SettingsPopup.appendChild(FooterRow);
    const Ok = document.createElement('button');
    FooterRow.appendChild(Ok);
    Ok.setAttribute('class', 'btn btn-search btn-outline-primary float-right');
    Ok.innerHTML = '保存';
    Ok.onclick = function () {
        GM_setValue('BackgroundImage', backgroundImageInput.value);
        GM_setValue('SiteIconImage', siteIconImageInput.value);
        GM_setValue('Academic', (document.getElementById('AcademicSwitch') as HTMLInputElement).checked);
        GM_setValue('Ligatures', (document.getElementById('LigaturesSwitch') as HTMLInputElement).checked);
        GM_setValue('Darktheme', darkthemeSelect.value);
        location.reload();
    };
    const Clear = document.createElement('button');
    FooterRow.appendChild(Clear);
    Clear.setAttribute('class', 'btn btn-search btn-outline-primary float-right');
    Clear.innerHTML = '恢复默认';
    Clear.onclick = function () {
        const values = GM_listValues();
        for (const value in values) {
            GM_deleteValue(values[value]);
        }
        location.reload();
    }
}