import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
 routes:[
    {
      path: "/",
      redirect:'/login'
      // component: () => import("../views/login/index.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/index.vue"),
      redirect:'/homepage', //当进入home主页面时，展示 homepage页面
      children:[{ 
        path:'/homepage',
        name:'homepage',
        component:() => import('../views/homepage/index.vue')
      },
      { 
        //保险产品表
        path:'/product',
        name:'product',
        component:() => import('../views/product/index.vue')
      },
      { 
        //保险方案页配置表
        path:'/companytable',
        name:'companytable',
        component:() => import('../views/companyTable/index.vue')
      },
      { 
        //公司配置表
        path:'/companyconfig',
        name:'companyconfig',
        component:() => import('../views/config/companyConfigTable/index.vue')
      },
      { 
        //配置关联功能
        path:'/configfunction',
        name:'configfunction',
        component:() => import('../views/config/configFunction/index.vue')
      },
      { 
        //前端页面配置表
        path:'/pageconfig',
        name:'pageconfig',
        component:() => import('../views/config/pageConfigTable/index.vue')
      },
      { 
        //系统来源表
        path:'/system',
        name:'system',
        component:() => import('../views/config/system/index.vue')
      },
      { 
        //支付配置
        path:'/payconfig',
        name:'payconfig',
        component:() => import('../views/config/payConfig/index.vue')
      }
    ]
    }
  ]
});

router.beforeEach((to,from,next) =>{
  if(to.path === '/login') next()
   const token = window.localStorage.getItem('token');
    console.log(token)
    if(!token){
      this.$router.push({path:'/login'})
    }else {
      next()
    }
 })


// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

export default router;
