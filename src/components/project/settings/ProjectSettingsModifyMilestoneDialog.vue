<template>
<div class="modify-milestone-dialog-wrapper">
<el-dialog title="编辑里程碑" :visible.sync="isModifyMilestoneDialogVisible">
  <el-form :model="milestone" @submit.native.prevent label-position="top">
    <el-form-item label="名称">
      <el-input v-model="milestone.name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="milestone.description" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="预计完成日期">
      <el-date-picker v-model="milestone.deadline" placeholder="" style="width:100%"></el-date-picker>
    </el-form-item>
    <el-form-item label="里程碑状态">
      <el-switch v-model="milestone.isFinished" @change="changeSwitch" active-text="已完成" inactive-text="未完成" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </el-form-item>
    <el-form-item label="完成时间" v-if="milestone.isFinished">
      <el-date-picker v-model="milestone.finishDate" type="date" placeholder="暂未完成" style="width: 100%"></el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer">
    <el-button type="primary" @click="submitForm">确定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  name: 'projectSettingsModifyMilestoneDialog',
  props: ['modifyMilestone'],
  data () {
    return {
      milestone: {}
    }
  },
  computed: {
    isModifyMilestoneDialogVisible: {
      get: function () {
        return this.$store.state.project.isModifyMilestoneDialogVisible
      },
      set: function (newValue) {
        this.$store.dispatch('project/setIsModifyMilestoneDialogVisible', { isModifyMilestoneDialogVisible: newValue })
      }
    }
  },
  updated () {
    this.milestone = this.modifyMilestone
  },
  methods: {
    changeSwitch: function (newValue) {
      if (newValue === false) {
        this.milestone.finishDate = undefined
      } else {
        this.milestone.finishDate = new Date()
      }
    },
    submitForm: function () {
      console.log(this.milestone)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
