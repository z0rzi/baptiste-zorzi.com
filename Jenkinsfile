pipeline {
    environment {
        SERVER_IP_1 = "145.14.158.99"
        SERVER_CREDENTIALSID = "baptiste-zorzi-com"
        SERVER_DEPLOY_DIR = "/var/baptiste-zorzi.com/"

        CACHE_DIR = "/tmp/nm_cache/baptiste-zorzi.com/"

        GIT_URL = "https://github.com/z0rzi/baptiste-zorzi.com.git"
        GIT_BRANCH = "feat/CI"
        GIT_CREDENTIALS = "github"
    }
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Checkout code') {
            steps {
                git (
                    url: "${GIT_URL}",
                    branch: "${GIT_BRANCH}",
                    credentialsId: "${GIT_CREDENTIALS}",
                    changelog: true
                )
                sh '''
                    pwd
                    ls -al
                    cache_dir="${CACHE_DIR}"
                    cache_nm="${CACHE_DIR}node_modules"
                    cache_lock="${CACHE_DIR}yarn.lock"

                    if [ ! -d "$cache_dir" ]; then mkdir -p ${cache_dir}; fi
                    if [ ! -d "$cache_nm" ]; then mkdir -p ${cache_nm}; fi
                    if [ -d "$cache_nm" ]; then ln -sf ${cache_nm} ./; fi
                    if [ -f "$cache_lock" ]; then mv -n ${cache_lock} .; fi

                    ls -al
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                    yarn install
                    yarn build

                    ls -al
                    mv ./yarn.lock ${CACHE_DIR}
                    rm -rf ./node_modules
                    ls -al
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    rm -rf /tmp/build-backup
                    mv -f ${SERVER_DEPLOY_DIR}build /tmp/build-backup
                    mv -f build ${SERVER_DEPLOY_DIR}build
                '''
            }
        }
    }
}
