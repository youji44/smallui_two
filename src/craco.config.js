const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@btn-primary-bg':"#003F63",
                // "@input-border-color":"rgb(157,211,175)",
                "@input-hover-border-color":"#003F63",        
                "@menu-dark-item-active-bg":"#003F63",
                "@radio-dot-color": '#003F63',
                "@radio-solid-checked-color": '#003F63',
                '@checkbox-color': '#003F63',
                'switch-sm-height': '20px',
                'switch-color': '#003F63',
                'progress-steps-item-bg':'#003F63',
                'calendar-item-active-bg':'#003F63'
             },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};