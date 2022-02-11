module.exports = {
    apps: [
        {
            name: 'markitone',
            exec_mode: 'cluster',
            script: 'dist/main.js',
            instance_var: 'INSTANCE_ID',
            ignore_watch: ['app.log'],
            watch: false,
            instances : "max",
        },
    ],
};
