import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/uploadRec/vue-admin-template/table/list/'+params,
    method: 'get',
  })
}
export function addUser(student) {
  return request({
    url: '/stu/vue-admin-template/table/add', // 更改为您的后端 API 的添加学生方法的 URL
    method: 'post',
    data: student,
  });
}
export function deleteUser(id) {
  return request({
    url: `/stu/vue-admin-template/table/delete/${id}`,
    method: 'delete',
  });
}
export function updateUser(updatedUser) {
  console.log("Sending updated data:", updatedUser);
  return request({
    url: `/stu/vue-admin-template/table/update`,
    method: 'put',
    data: updatedUser,
  });
}