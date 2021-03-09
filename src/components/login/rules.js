const loginRules = {
  username: [
    { required: true, message: "请输入邮箱账户", trigger: "blur" },
    {
      pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g,
      message: "邮箱格式不正确"
    }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
};
const registRules = {
  email: [
    { required: true, message: "请输入邮箱账户", trigger: "blur" },
    {
      pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g,
      message: "邮箱格式不正确"
    }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      pattern: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/,
      message: "验证码格式不正确"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
      message: "6-16位大小写字母、数字、符号组合"
    }
  ],
  confirmPassWord: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
      message: "6-16位大小写字母、数字、符号组合"
    }
  ]
};

const passRules = {
  username: [
    { required: true, message: "请输入邮箱账户", trigger: "blur" },
    {
      pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g,
      message: "邮箱格式不正确"
    }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      pattern: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/,
      message: "验证码格式不正确"
    }
  ]
};
export { loginRules, registRules, passRules };
