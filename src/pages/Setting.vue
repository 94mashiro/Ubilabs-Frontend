<template>
<section class="container">
  <header>
    <h2>个人设置</h2>
  </header>
  <div class="setting-wrapper">
    <el-tabs type="border-card">
      <el-tab-pane label="资料修改">
        <profile-setting></profile-setting>
      </el-tab-pane>
      <el-tab-pane label="密码修改">
        <update-password></update-password>
      </el-tab-pane>
      <el-tab-pane label="SSH Key">
        <update-ssh-key></update-ssh-key>
      </el-tab-pane>
    </el-tabs>
  </div>
</section>
</template>

<script>
import ProfileSetting from '@/components/setting/ProfileSetting'
import UpdatePassword from '@/components/setting/UpdatePassword'
import UpdateSshKey from '@/components/setting/UpdateSSHKey'
export default {
  name: 'setting',
  components: {
    ProfileSetting,
    UpdatePassword,
    UpdateSshKey
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 25px auto;

  h2 {
    font-size: 24px;
    padding-left: 10px;
    border-left: 5px solid #409EFF;
  }

  header {
    margin-bottom: 30px;
  }

  .el-tabs {
    min-height: 300px !important;
  }
}
</style>

