<template>
  <body>
    <el-card class="login-box">
      <div class="img-box">
        <img class="login-img" src="../../assets/img/login.jpg">
        <!-- <div class="company">数驱优科技</div> -->
      </div>
      <div class="form-box">
        <div class="login-container">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
              <h3 class="title">{{ title }}</h3>
            </div>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                class="login-input"
                :placeholder="$t('Msg.InputName')"
                prefix-icon="el-icon-user"
                autocomplete="on"
                size="big"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                ref="password"
                v-model="loginForm.password"
                class="login-input"
                :placeholder="$t('Msg.InputPassword')"
                prefix-icon="el-icon-lock"
                autocomplete="on"
                show-password
                size="big"
              />
            </el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-top:10px;"
              round
              size="big"
              class="gradientBtn"
              @click="toLogin"
              @keyup.enter="keyDown"
            >
              {{ $t('title.Login') }}
            </el-button>
          </el-form>
        </div>
      </div>
    </el-card>
    <div style="position:fixed;text-align:center;bottom:0;margin:0 auto;width:100%;color: #5c6b77">
      <!-- <el-link style="text-align: center;" href="https://beian.miit.gov.cn/" target="_blank">闽ICP备2021015611号</el-link> -->
    </div>
  </body>
</template>

<script>
import { title } from '@/settings'
export default {
  name: 'Login',
  data() {
    return {
      title: title,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: this.$t('Form.NotNull') }],
        password: [{ required: true, trigger: 'blur', message: this.$t('Form.NotNull') }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown) // 绑定监听事件
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
    window.removeEventListener('keydown', this.keyDown, false) // 绑定监听事件
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    toLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击回车键登录
    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode === 13 || e.keyCode === 100) {
        this.toLogin() // 定义的登录方法
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
body {
	background: #5D4157;
	/* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #ffffff, #eeecec);
	/* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #ffffff, #eeecec);
	/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	background-size: 400%;
	animation: backdiv 12s infinite;
}
@keyframes backdiv {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
  .login-form {
    text-align: center;
    position: relative;
    max-width: 100%;
    padding: 70px 55px 30px;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: rgb(122, 122, 122);
      text-align: center;
      margin-bottom: 20%;
      // font-family: 'SimHei';
      // font-weight: bold;
    }
  }
.el-button {
  background:-webkit-gradient(linear, 100% 0%, 0% 0%,from(#59C2FD), to(#2B99FF));
  border-radius: 20px;
  color: #fff;
}
.el-button:hover {
  background:-webkit-gradient(linear, 100% 0%, 0% 0%,from(#3eaff0), to(#218ff5));
  border-radius: 20px;
  color: #fff;
}
</style>

<style>
.login-box .el-card__body{
  padding: 0px;
}
.login-box {
  width: 900px;
  height: 520px;
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  margin: auto;
}
.form-box{
  width: 50%;
  height: 520px;
  float: right;
}
.login-img{
  width: 50%;
  height: 100%;
  float: left;
  position: absolute;
  z-index: 2;
}
img{width:100%;}
/* .login-input .el-input__inner {
  border: 0;
  background-color: rgba(209, 202, 202, 0.247) !important;
} */
.company{
  -webkit-line-clamp: 2;
  font-size: 16px;
  color:#2ba6c4;
  z-index: 9;
  position: absolute;
  display: inline;
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
.login-input .el-input__inner {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #C0C4CC;
}
.login-input .el-input__inner:hover {
  border-bottom: 1px solid #409EFF;
}
.login-input .el-icon-user:before{
  -webkit-line-clamp: 2;
  font-size: 25px;
  background-image: -webkit-linear-gradient(bottom, #59C2FD,#3F79F4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.login-input .el-icon-lock:before {
  -webkit-line-clamp: 2;
  font-size: 25px;
  background-image: -webkit-linear-gradient(bottom, #59C2FD,#3F79F4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.login-input .el-icon-lock:before {
  -webkit-line-clamp: 2;
  font-size: 25px;
  background-image: -webkit-linear-gradient(bottom, #59C2FD,#3F79F4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
