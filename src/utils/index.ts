import Config from '@/config';
import {getOssFileUrl} from '@/services/common';
import {message, Modal} from 'antd';
import DICT_CONST from '@/common/constants';
import {history} from "umi";

export function navigateToLogin() {
	console.log('登录失效')
	message.error('登录状态失效，请重新登陆')
	history.push('/login')
}

/**
 * 函数在被调用fps秒才会被执行，如果中间被打断，则继续向后顺延fps秒
 * @param {*} fn  方法
 * @param {*} delay 延迟时间
 * @returns
 */
export function debounce(fn: any, delay = 60) {
	let timer: any = null;
	return (...args: any) => {
		if (delay > 0) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				// @ts-ignore
				fn.apply(this, args);
			}, delay);
		} else {
			// @ts-ignore
			fn.apply(this, args);
		}
	};
}

/**
 * 事件被第一次触发后，立即执行，当过了delay后才能再次响应执行
 * 节流
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export function throttle(fn: any, delay = 60) {
	let last = 0; // 上次触发时间
	return (...args: any) => {
		const now = Date.now();
		if (now - last > delay) {
			last = now;
			// @ts-ignore
			fn.apply(this, args);
		}
	};
}

/**
 * 以某个频率做某件事情，且第一次、最后一次调用必然会被触发
 * @param {function} fn
 * @param {number} [fps=60]
 * @returns {function}
 */
export function frequency(fn: any, fps = 60) {
	let time = 0;
	let now = time;
	let ST: any;
	const newFn = (...args: any) => {
		clearTimeout(ST);
		now = Date.now();
		const distance = now - time;

		if (distance >= fps) {
			time = now;
			fn(...args);
		} else {
			ST = setTimeout(() => {
				newFn(...args);
			}, distance);
		}
	};
	return newFn;
}

export function getSearchParams() {
	let urlSearch = window.location.search;
	if (!urlSearch) {
		const hash = window.location.hash;
		if (hash.indexOf('?') > -1) {
			urlSearch = hash.slice(hash.indexOf('?'));
		}
	}
	const urlSearchParams = new URLSearchParams(urlSearch);
	// 把键值对列表转换为一个对象
	const params = Object.fromEntries(urlSearchParams.entries());
	return params;
}

// 随机字符串
export function uuid(len = 8) {
	const S = 'qwertyuioopasdfghjklzxcvbnmQWERTYUIOOPASDFGHJKLZXCVBNM0123456789';
	const LEN = S.length - 1;
	return ' '
		.repeat(len)
		.split('')
		.map(() => S[Math.round(Math.random() * LEN)])
		.join('');
}

//下载文件

export function downloadFile(resourceId) {
	if (resourceId.startsWith('https://') || resourceId.startsWith('http://')) {
		window.location.href = resourceId;
		return;
	}
	getOssFileUrl({
		resourceId: resourceId,
		accessTerm: 'FRONT',
	}).then((res) => {
		if (!res.entry) {
			message.error('资源id失效');
			return;
		}
		window.location.href = res.entry;
	});
}

//数字值转万
export const transNumberToShort = (value, decimal = 2) => {
	const k = 10000;
	const sizes = ['', '万', '亿', '万亿'];
	let i = undefined;
	let str = '';
	if (value < k) {
		str = value;
	} else {
		i = Math.floor(Math.log(value) / Math.log(k));
		str = (value / Math.pow(k, i)).toFixed(decimal) + sizes[i];
	}
	return str;
};

/**
 * 替换rss文件为下载链接
 */
export const downloadFileURL = (url: string) => {
	if (url.includes('static')) {
		return url.replace('static', 'static-download');
	}
	if (url.includes('private')) {
		return url.replace('private', 'downloadfile');
	}
};

//保留小数几位
export const toFixed = (num: any, decimal: number) => {
	if (num) {
		let newNum = num.toString();
		let index = newNum.indexOf('.');
		if (index !== -1) {
			newNum = newNum.substring(0, decimal + index + 1);
		} else {
			newNum = newNum.substring(0);
		}
		return parseFloat(newNum).toFixed(decimal);
	}
};

export const pageHref = (() => {
	const pages: any = {
		daily: `https://daily.xinc818.net`,
		development: `https://dev.xinc818.net`,
		gray: `https://gray.xinc818.net`,
		production: `https://h5.xinc818.com`,
	};
	return pages[Config.env];
})();

export const jumpExportCenter = () => {
	Modal.confirm({
		title: false,
		content: '数据已生成，请至导出中心查看',
		okText: '立即查看',
		cancelText: '返回',
		onOk() {
			window.open(`${pageHref}/export/#/taskcenter/exportrecord`, '_blank');
		},
	});
};

export const filterPageName = (params: any) => {
	const newParams = {
		...params,
		pageNum: params.current,
		pageSize: params.pageSize,
	};
	delete newParams.current;
	return newParams;
};

//枚举 constants
export const dict = function (val: string, type: string, defaultValue = '-') {
	if (typeof val !== 'undefined') {
		return getDict(val, type, 'value', defaultValue);
	} else {
		return defaultValue;
	}
};
//枚举颜色 constants
export const dictColor = function (val: string, type: string, defaultValue = '#eaeaea') {
	if (typeof val !== 'undefined') {
		return getDict(val, type, 'color', defaultValue);
	} else {
		return defaultValue;
	}
};

function getDict(key: string, type: string, val: string, defaultValue: string) {
	let dictList = DICT_CONST[type];
	try {
		let [item] = dictList.filter((dict) => dict['key'].toString() === key.toString());
		return item ? item[val] : defaultValue;
	} catch (e) {
		console.log(e);
	}
}
