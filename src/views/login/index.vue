<template>
  <div class="login-container">
    <el-form ref="user" :model="user" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">todo-online-task</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input v-model="user.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input :type="pwdType" v-model="user.password" name="password" auto-complete="on" placeholder="password" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin(user)">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <div class="row">
          <span style="margin-right:20px;">username: admin</span>
          <span> password: password</span>
        </div>
        <div class="row">
          <span style="margin-right:20px;">username: user</span>
          <span> password: password</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { User } from '@/models';
import { AuthService } from '@/services';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { ElForm } from 'element-ui/types/form';

const empty = (rule: any, value: string, callback: any) => {
 if (!value) {
    callback(new Error('Requerid field'));

  } else {
    callback(undefined);
  }
};

@Component
export default class Login extends Vue {
  private user = new User();

  private loginRules = {
    username: [{ required: true, trigger: 'blur', validator: empty }],
    password: [{ required: true, trigger: 'blur', validator: empty }],
  };
  private pwdType = 'password';
  private redirect: string | undefined = undefined;

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && route.query.redirect as string;
  }

  private showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = '';
    } else {
      this.pwdType = 'password';
    }
  }
  private get loading(): boolean {
    return this.$store.getters['user/loading'];
  }

  private async handleLogin(user: User) {
      let data = new User();
      data = await this.$store.dispatch('user/init', { user });
      if (data) {
        this.$router.push({ path: this.redirect || '/' });
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
