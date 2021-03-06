import request from '@/utils/request'
import axios from "axios";
import { uploadBaseApi } from '@/api/common'
import { getToken } from '@/utils/auth'

// -------------------询价管理-------------------------

// 询价单管理(新增)
export function saveInquiryPrice(option) {
  return request.post('/backend-inquiry-quotation/inquiryPrice/saveInquiryPrice', option);
}

// 询价单管理(修改)
export function updateInquiryPrice(option) {
  return request.post('/backend-inquiry-quotation/inquiryPrice/updateInquiryPrice', option);
}

// 询价单管理(查询)
export function pageInquiryPrice(option) {
  return request.post('/backend-inquiry-quotation/inquiryPrice/pagephInquiryPrice', option);
}

// 查看询价单详情
export function detailInquiryPrice(option) {
  return request.get('/backend-inquiry-quotation/inquiryPrice/getInquiryPriceByBId', { params: option });
}

// 询价单管理(删除)
export function deleteInquiryPrice(option) {
  return request.post('/backend-inquiry-quotation/inquiryPrice/deleteInquiryPrice', option);
}

// 批量 询价单管理(删除)
export function deleteInquiryPriceByIds(option) {
  return request.post('/backend-inquiry-quotation/inquiryPrice/deleteInquiryPriceByIds', option);
}

// 无法报价
export function updateInquiryOrderRefused(option) {
  return request.get('/backend-inquiry-quotation/inquiryPrice/updateInquiryOrderRefused', { params: option });
}

/**
 *
 * 导出询价单(easypoi版)
 */
export function exportByInquiryPriceExcel(option) {
  return axios({
    method: 'post',
    data: option,
    url: `${uploadBaseApi}/backend-inquiry-quotation/inquiryPrice/exportByInquiryPrice`,
    headers: {
      token: getToken()
    },
    responseType: 'blob'
  });
}

// -------------------报价管理-------------------------

/**
 *
 * 导出报价单(easypoi版)
 */
export function exportByQuotedPriceExcel(option) {
  return axios({
    method: 'post',
    data: option,
    url: `${uploadBaseApi}/backend-inquiry-quotation/quotedPrice/exportByQuotedPrice`,
    headers: {
      token: getToken()
    },
    responseType: 'blob'
  });
}
// 报价管理(新增)
export function saveQuotedPrice(option) {
  return request.post('/backend-inquiry-quotation/quotedPrice/saveQuotedPrice', option);
}

// 报价管理(修改)
export function updateQuotedPrice(option) {
  return request.post('/backend-inquiry-quotation/quotedPrice/updateQuotedPrice', option);
}

// 报价管理(查询)
export function pageQuotedPrice(option) {
  return request.post('/backend-inquiry-quotation/quotedPrice/pagephQuotedPrice', option);
}

// 查询报价单详情(通过报价单BID)
export function detailQuotedPrice(option) {
  return request.get('/backend-inquiry-quotation/quotedPrice/getQuotedPriceByBId', { params: option });
}

// 查询报价单详情(通过询价单BID)
export function getQuotedPrice(option) {
  return request.post('/backend-inquiry-quotation/quotedPrice/getQuotedPriceByInquiryBId', option);
}

// 报价管理(删除)
export function deleteQuotedPrice(option) {
  return request.post('/backend-inquiry-quotation/quotedPrice/deleteQuotedPrice', option);
}

// 批量报价管理(删除)
export function deleteQuotedPriceByIds(option) {
  return request.post('/backend-inquiry-quotation/quotedPrice/deleteQuotedPriceByIds', option);
}

// 默认获取当前用户下的企业公司名
export function getSetSellerNameInfoApi(option) {
  return request.get('/backend-inquiry-quotation/quotedPrice/getSetSellerNameInfo', { params: option });
}

// 新增询价单
export function addInquiry(option) {
  return request.post('/backend-inquiry-quotation/inquiryPrice/saveInquiryPrice', option);
}

// 通知客户操作-报价单由待通知状态变为已报价状态
export function updateQuotedPriceSendStatusApi(option) {
  return request.get('/backend-inquiry-quotation/quotedPrice/updateQuotedPriceSendStatus', { params: option });
}
// -----------------------------------------------询报价管理-定制管理----------------------------------------------------------
// 通过ID查看详情
export function selectByIdApi(option) {
  return request.get(`backend-inquiry-quotation/customOrder/selectById`, { params: option })
}

// 通过BID查看详情
export function selectCustomById(option) {
  return request.get(`backend-inquiry-quotation/customOrder/selectCustomById`, { params: option })
}
// 拒绝报价
export function updateRefused(option) {
  return request.get(`backend-inquiry-quotation/customOrder/updateRefused`, { params: option })
}

// 通过bid查看详情
export function selectCustomByIdApi(option) {
  return request.get(`backend-inquiry-quotation/customOrder/selectCustomById`, { params: option })
}
// 后台服务--分页搜索条件查询定制列表
export function selectCustomOrderListAllApi(option) {
  return request.post(`backend-inquiry-quotation/customOrder/selectCustomOrderListAll`, option)
}
// 后台服务--暂存操作-后台人员进行定制新增操作
export function saveAdminCustomApi(option) {
  return request.post(`backend-inquiry-quotation/customOrder/saveAdminCustom`, option)
}
// 后台服务--提交操作-后台人员进行定制新增操作
export function submitAdminCustomApi(option) {
  return request.post(`backend-inquiry-quotation/customOrder/submitAdminCustom`, option)
}
// 后台服务--后台人员进行删除操作-单删除
export function deleteCustomByIdApi(option) {
  return request.get(`backend-inquiry-quotation/customOrder/deleteCustomById`, { params: option })
}
// 后台服务--后台人员进行删除操作-批量删除
export function deleteCustomOrderIdsApi(option) {
  return request.post(`backend-inquiry-quotation/customOrder/deleteCustomOrderIds`, option)
}
// 前台服务--前台用户进行定制保存操作
export function saveUserCustomApi(option) {
  return request.post(`backend-inquiry-quotation/customOrder/saveUserCustom`, option)
}
// 前台服务--根据用户ID分页搜索条件查询定制列表
export function selectUserCustomOrderListApi(option) {
  return request.post(`backend-inquiry-quotation/customOrder/selectUserCustomOrderList`, option)
}

// 定制单附件-全部下载
// export function downloadApi(option) {
//   return request.get(`inquiry/customOrderFile/downloadCustomOrderFile`, { params: option })
// }
export function downloadApi(option) {
  return axios({
    method: 'get',
    data: {
      params: option
    },
    url: `${uploadBaseApi}/backend-inquiry-quotation/customOrderFile/downloadCustomOrderFile`,
    headers: {
      token: getToken()
    },
    responseType: 'blob'
  })
}

/**
 *
 * 导出定制单(easypoi版)
 */
export function exportCustomOrderExcelApi(option) {
  return axios({
    method: 'post',
    data: option,
    url: `${uploadBaseApi}/backend-inquiry-quotation/customOrder/exportByCustomOrder`,
    headers: {
      token: getToken()
    },
    responseType: 'blob'
  })
}
