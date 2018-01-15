<template>
  <div class="add-milestone-wrapper">
    <el-dialog title="添加里程碑" :visible.sync="isAddMilestoneDialogVisible">
      <el-form :model="postBody" @submit.native.prevent ref="form" :rules="rules" status-icon>
        <el-form-item label="名称" prop="name">
          <el-input v-model="postBody.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="postBody.description" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="预计完成日期" prop="deadline">
          <el-date-picker v-model="postBody.deadline" placeholder="" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="submitForm">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postProjectMilestone } from '@/store/api'
export default {
  name: 'projectSettingsAddMilestoneDialog',
  computed: {
    isAddMilestoneDialogVisible: {
      get: function () {
        return this.$store.state.project.isAddMilestoneDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('project/setIsAddMilestoneDialogVisible', { isAddMilestoneDialogVisible: newValue })
      }
    }
  },
  data () {
    return {
      postBody: {},
      rules: {
        name: [
          { required: true, message: '请输入里程碑名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入里程碑描述', trigger: 'blur' }
        ],
        deadline: [
          { required: true, message: '请选择预计完成日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.postBody.project = this.$route.params.id
          postProjectMilestone(this.postBody).then(async body => {
            if (!body.success) {
              throw body.message
            } else {
              this.postBody = {}
              this.isAddMilestoneDialogVisible = false
              await this.$store.dispatch('project/getProject', { projectId: this.$route.params.id })
              this.$notify.success('项目里程碑添加成功。')
            }
          }).catch(err => {
            this.$notify.error(err.message || err)
          })
        } else {
          this.$notify.error('请检查表单是否填写正确。')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


