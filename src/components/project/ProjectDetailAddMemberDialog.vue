<template>
<div class="add-member-wrapper">
  <el-dialog title="添加项目组成员" :visible.sync="isAddMemberDialogVisible">
    <el-dialog title="确认用户信息" :visible.sync="showInsideDialog" :append-to-body="true" width="30%">
      <div class="comfirm-addMember" :key="addMember._id">
        <span>你确定添加用户&nbsp;</span><author-info :author="addMember" :mini="true" :avatarSize="20"></author-info><span>&nbsp;吗？</span>
      </div>
      <div slot="footer">
        <el-button type="success" size="small" @click="confirmSucceed">确认</el-button>
        <el-button type="danger" size="small" @click="confirmFailed">取消</el-button>
      </div>
    </el-dialog>
    <el-alert
      v-if="showError"
      :title="errorMessage"
      type="error"
      show-icon
      @close="closeError"
      class="dialog-alart"
    >
    </el-alert>
    <el-form status-icon :model="postBody" :rules="formRules" ref="ruleForm">
      <el-form-item prop="email">
        <el-input v-model="postBody.email" placeholder="请输入用户的Email"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" slot="footer"><el-button type="primary" size="small" @click="verifyEmail">添加</el-button></div>
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getProfile, postMember } from '@/store/api'
import AuthorInfo from '@/components/forum/AuthorInfo'
import sleep from '@/utils/sleep'
export default {
  name: 'projectDetailAddMemberDialog',
  components: {
    AuthorInfo
  },
  data () {
    return {
      showError: false,
      showInsideDialog: false,
      errorMessage: '',
      postBody: {
        email: '',
        memberId: '',
        projectId: this.$route.params.id,
        leaderGitToken: ''
      },
      addMember: {},
      formRules: {
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      project: 'project/project',
      profile: 'user/profile'
    }),
    isAddMemberDialogVisible: {
      get: function () {
        return this.$store.state.project.isAddMemberDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('project/setIsAddMemberDialogVisible', { isAddMemberDialogVisible: newValue })
      }
    }
  },
  methods: {
    closeError: function () {
      this.showError = false
    },
    verifyEmail: function () {
      this.showError = false
      console.log(this.postBody.email)
      if (this.postBody.email === this.project.leader.email) {
        this.errorMessage = '您不能添加自己。'
        this.showError = true
      } else {
        for (let member of this.project.member) {
          if (member.email === this.postBody.email) {
            this.errorMessage = '该用户已加入此项目。'
            this.showError = true
            return
          }
        }
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            try {
              const body = await getProfile({ email: this.postBody.email })
              if (body.success) {
                this.addMember = body.result
                console.log(this.addMember)
                this.showInsideDialog = true
              } else {
                this.errorMessage = body.message
                this.showError = true
              }
            } catch (err) {
              console.error(err)
            }
          }
        })
      }
    },
    confirmFailed: function () {
      this.showInsideDialog = false
    },
    confirmSucceed: async function () {
      this.postBody.memberId = this.addMember._id
      this.postBody.leaderGitToken = this.profile.gitlabToken
      try {
        const body = await postMember(this.postBody)
        if (body.success) {
          this.showInsideDialog = false
          this.isAddMemberDialogVisible = false
          this.showError = false
          this.errorMessage = ''
          await sleep(1000)
          this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
          this.$message.success('添加项目组成员成功')
        } else {
          this.$message.error(body.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-alart {
  margin-bottom: 20px;
}
.comfirm-addMember {
  display: flex;
  flex-direction: row;
}
</style>

