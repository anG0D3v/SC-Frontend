// import toast from 'react-hot-toast';
import CryptoJs from 'crypto-js';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { ANNOUNCEMENT_STATUS } from './constants';

function initialPlaceholder(text) {
    const fCharacter = text?.split(' ')[0];
    const sCharacter = text?.split(' ')[1];

    return fCharacter?.split('')[0]?.toUpperCase() + sCharacter?.split('')[0]?.toUpperCase();
}

function getTenantNameInUrl(url) {
    const removeProtocol = url.replace(/^(https?:\/\/)?/, '');
    const regex = /([^./]+)\./;
    const match = removeProtocol.match(regex);
    const value = match && match[1];

    return value;
}

function truncateText(text, length) {
    if (text.length >= length) {
        return text.substring(0, 10).concat(' ...');
    }
    return text;
}

function capitalizeFirstLetter(str) {
    return str ? str?.charAt(0).toUpperCase() + str?.slice(1) : '';
}

function isValidURL(value) {
    return !!value?.startsWith('https://');
}

const globalSelector = (key) => (state) => state[key];

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getDeleteStatus(status) {
    if (status) {
        return 'Deleted';
    } else {
        return 'Published';
    }
}

function decryptText(str) {
    return CryptoJs.AES.decrypt(str, process.env.CRYPTOJS_KEY).toString(CryptoJs.enc.Utf8);
}

const useCustomCookies = (cookieName) => {
    const [cookie, setCookie, removeCookie] = useCookies([cookieName]);
    const enhancedCookies = {
        ...cookie,
    };
    return { cookie: enhancedCookies, setCookie, removeCookie };
};

function getStatus(status) {
    if (status === 'DRA') {
        return 'Draft';
    } else if (status === 'PEN') {
        return 'Pending';
    } else if (status === 'REJ') {
        return 'Sent Back';
    } else if (status === 'DEL') {
        return 'Deleted';
    } else {
        return 'Published';
    }
}

function isDeleted(value) {
    if (value === true) {
        return 'Deleted';
    } else {
        return 'Published';
    }
}

function removeHtmlTags(inputString) {
    return inputString.replace(/<[^>]*>/g, '');
}

function truncateValue(inputText) {
    const maxLines = 3;
    const maxCharactersPerLine = 100;
    const ellipsis = '...';

    const lines = inputText.split('\n');
    let truncatedText = '';

    for (let i = 0; i < maxLines; i++) {
        if (lines[i]) {
            if (truncatedText.length + lines[i].length <= maxCharactersPerLine) {
                truncatedText += lines[i];
            } else {
                const remainingCharacters = maxCharactersPerLine - truncatedText.length;
                truncatedText += lines[i].substr(0, remainingCharacters) + ellipsis;
                break;
            }

            if (i < maxLines - 1) {
                truncatedText += '\n'; // Add line break unless it's the last line
            }
        } else {
            break; // No more lines to truncate
        }
    }

    return truncatedText;
}

function checkLanguage(data) {
    const languageIds = data.map((item) => item.language_id || '');

    // Use Set to eliminate duplicate language_ids
    const uniqueLanguageIds = [...new Set(languageIds)];

    if (uniqueLanguageIds.length === 1) {
        if (uniqueLanguageIds[0] === 'en') {
            return 'English';
        } else if (uniqueLanguageIds[0] === 'es') {
            return 'Spanish';
        } else {
            return 'Unknown Language';
        }
    } else if (uniqueLanguageIds.length === 2) {
        if (uniqueLanguageIds.includes('en') && uniqueLanguageIds.includes('es')) {
            return 'English/Spanish';
        } else {
            return 'Unknown Language';
        }
    } else {
        return 'Multiple Languages';
    }
}

function unixTimestampToDateTime(unixTimestamp) {
    const now = moment();
    const dateTime = moment.unix(unixTimestamp);

    if (now.isSame(dateTime, 'day')) {
        // Today
        return `Today at ${dateTime.format('h:mm A')}`;
    } else if (now.subtract(1, 'days').isSame(dateTime, 'day')) {
        // Yesterday
        return `Yesterday at ${dateTime.format('h:mm A')}`;
    } else if (now.isSame(dateTime, 'week')) {
        // Within the same week
        return `${dateTime.format('dddd')} at ${dateTime.format('h:mm A')}`;
    } else {
        // Any other date
        return dateTime.format('MMM D, YYYY [at] h:mm A');
    }
}

function getLanguage(languageId) {
    switch (languageId) {
        case 'en':
            return 'English';
        case 'es':
            return 'Spanish';
        default:
            return 'English';
    }
}

function getAnnouncementStatus(status) {
    switch (status) {
        case ANNOUNCEMENT_STATUS.SENT:
            return 'Sent and Saved';
        case ANNOUNCEMENT_STATUS.SCHEDULED:
            return 'Scheduled';
        case ANNOUNCEMENT_STATUS.TRASHED:
            return 'Trashed';
        case ANNOUNCEMENT_STATUS.DRAFT:
            return 'Drafted';
        default:
            return '';
    }
}

const convertDateFromUnix = (value) => {
    return moment.unix(value).format('MMMM DD, YYYY');
};

// const clearCookies = () => {
//     const [cookie, removeCookie] = useCookies(['authorized', 'token']);
//     if(cookie.authorized && cookie.token) {
//         console.log('UES');
//         removeCookie('authorized', { path: '/', expires: new Date(),  maxAge: 0 });
//         removeCookie('token', { path: '/', expires: new Date(),  maxAge: 0 });
//     }
// }

export {
    capitalizeFirstLetter,
    checkLanguage,
    convertDateFromUnix,
    decryptText,
    getAnnouncementStatus,
    getCookie,
    getDeleteStatus,
    getLanguage,
    getStatus,
    getTenantNameInUrl,
    globalSelector,
    initialPlaceholder,
    isDeleted,
    isValidURL,
    removeHtmlTags,
    truncateText,
    truncateValue,
    unixTimestampToDateTime,
    useCustomCookies,
};
