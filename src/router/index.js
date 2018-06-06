import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/HomeViewController'
import Unique from '@/components/UniqueSkill/UniqueSkillViewController';
import OpenClass from '@/components/OpenClass/OpenClassViewController';
import openClassHistory from '@/components/OpenClass/openClassHistory';
import popularColumn from '@/components/popularColumn/popularColumnViewController';
import uniqueSkillInformation from '@/components/UniqueSkill/uniqueSkillInformation';
// import chiefStrategy from '@/components/chiefStrategy/chiefStrategyViewController';
import VIP from '@/components/VIP/vipViewController';
import Tool from '@/Tool'

Vue.use(Router) ;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "博星投资课堂"
      }
    },
    {
      path: '/unique',
      name: 'Unique',
      component: Unique,
      meta: {
        title: "博星绝招"
      }
    },
    {
      path: '/uniqueSkillInformation',
      name: 'uniqueSkillInformation',
      component: uniqueSkillInformation,
      meta: {
        title: "博星策略"
      }
    },
    {
      path: '/openclass',
      name: 'OpenClass',
      component: OpenClass,
      meta: {
        title: "公开课"
      }
    },
    {
      path: '/openClassHistory',
      name: 'openClassHistory',
      component: openClassHistory,
      meta: {
        title: "公开课历史"
      }
    },
    {
      path: '/popularColumn',
      name: 'popularColumn',
      component: popularColumn,
      meta: {
        title: "人气栏目"
      },
    },
/*    {
      path: '/chiefStrategy',
      name: 'chiefStrategy',
      component: chiefStrategy,
      meta: {
        title: "首席策略"
      },
    },*/
    {
      path: '/VIP',
      name: 'VIP',
      component: VIP,
      meta: {
        title: "VIP"
      },
    },
    {
      path: '/Tool',
      name: 'Tool',
      component: Tool,
      meta: {
        title: "rem计算器"
      }
    }
  ]
})
