import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/staff/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function addUser(staff) {
  return request({
    url: '/staff/vue-admin-template/table/add', // 更改为您的后端 API 的添加学生方法的 URL
    method: 'post',
    data: staff,
  });
}
export function deleteUser(id) {
  return request({
    url: `/staff/vue-admin-template/table/delete/${id}`,
    method: 'delete',
  });
}
export function updateUser(updatedUser) {
  console.log("Sending updated data:", updatedUser);
  return request({
    url: `/staff/vue-admin-template/table/update`,
    method: 'put',
    data: updatedUser,
  });
}