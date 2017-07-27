let auth = {
  // 超级管理员，拥有所有权限，包括增删改查权限列表和管理员列表
  super: {
    id: 1
  },
  // 普通管理员，拥有部分权限，可以增删改查自己创建的条目，但是不能操作他人的条目。只能查看权限列表和管理员列表
  general: {
    id: 2
  }
};

export default auth;