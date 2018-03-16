<template>
  <div id="login">
    <el-form ref="form" status-icon :model="form" :rules="rules">
      <el-form-item label="登录名" prop="name">
        <el-input placeholder="请输入登录名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="islogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录名'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: 'admin',
        password: 'admin0001'
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      islogin: false
    }
  },
  methods: {
    onSubmit() {
      const _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.islogin = true;
          setTimeout(() => {
            _this.$message({
              type: 'success',
              message: `登录成功! 欢迎进入${_this.$adminConfig.title}`
            });
            _this.$router.push('/dashboard')
          }, 1000)
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less">
#login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .el-form{
    margin-top: -50px;
    padding: 20px 50px;
    border: 1px solid #ebebeb;
    background: #fff;
    border-radius: 3px;
    width: 300px;
    text-align: center;
    &:hover{
      box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    }
    .el-button{
      width: 240px;
    }
  }
}
</style>
