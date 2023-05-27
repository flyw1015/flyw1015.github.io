import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/news/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function addNews(news) {
  return request({
    url: '/news/vue-admin-template/table/add', // 更改为您的后端 API 的添加学生方法的 URL
    method: 'post',
    data: news,
  });
}
export function deleteNews(id) {
  return request({
    url: `/news/vue-admin-template/table/delete/${id}`,
    method: 'delete',
  });
}
export function updateNews(updatedNews) {
  
  return request({
    url: `/news/vue-admin-template/table/update`,
    method: 'put',
    data: updatedNews,
  });
}