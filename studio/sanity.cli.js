import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './project'

export default defineCliConfig({
  api: {projectId, dataset},
  studioHost: 'vastrakosh',
  deployment: {appId: 'm56helsrk90h169hn2hcktn1', autoUpdates: true},
})
