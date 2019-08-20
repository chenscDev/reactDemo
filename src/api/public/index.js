import ajax from '../basic';

export async function getEntityMenu(extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/menu/',
  }, extra), [], []);
  return result;
}

export async function getUserInfo(extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/org/user/querySelfInfo',
  }, extra), [], []);
  return result;
}

export async function getDefaultPage(extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/metadata/userHomePage',
  }, extra), [], []);
  return result;
}

