const rules = {
  nickName: [{ required: true, message: "请输入邮箱账户", trigger: "blur" }],
  linkman: [{ required: true, message: "请输入密码", trigger: "blur" }],
  phonenumber: [{ required: true, message: "请输入邮箱账户", trigger: "blur" }],
  creditCode: [{ required: true, message: "请输入密码", trigger: "blur" }],
  industryType: [
    { required: true, message: "请选择行业类型", trigger: "blur" }
  ],
  date: [{ required: true, message: "请选择营业期限", trigger: "blur" }],
  business_licence: [
    { required: true, message: "请选择营业执照", trigger: "blur" }
  ],
  authorization_letter: [
    { required: true, message: "请选择授权委托书", trigger: "blur" }
  ],
  idcard: [{ required: true, message: "请选择被授权人身份证", trigger: "blur" }]
};
export { rules };
