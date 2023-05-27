import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/notice/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function addNotice(notice) {
  return request({
    url: '/notice/vue-admin-template/table/add',
    method: 'post',
    data: notice,
  });
}
export function deleteNotice(id) {
  return request({
    url: `/notice/vue-admin-template/table/delete/${id}`,
    method: 'delete',
  });
}
export function updateNotice(updatedNotice) {
  return request({
    url: `/notice/vue-admin-template/table/update`,
    method: 'put',
    data: updatedNotice,
  });
}