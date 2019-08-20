import ajax from '../basic';

export async function getEntityListCount(extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/metadata/view/data/count',
  }, extra), [], []);
  return result;
}

export async function getEntityListType(extra) {
  const { apiName } = extra;
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: `/metadata/view/${apiName}`,
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

