pipeline {
    environment {
        SERVER_IP_1 = "145.14.158.99"
        SERVER_CREDENTIALSID = "baptiste-zorzi-com"
        SERVER_DEPLOY_DIR = "/var/baptiste-zorzi.com/"

        CACHE_DIR = "/var/nm_cache/baptiste-zorzi.com/"

        GIT_URL = "git@github.com:z0rzi/baptiste-zorzi.com.git"
        GIT_BRANCH = "feat/CI"
        GIT_CREDENTIALS = "github"
    }
    agent none
    stages {
        stage('Checkout code') {
            agent any
            steps {
                git (
                    branch: "${GIT_BRANCH}",
                    url: "${GIT_URL}",
                    changelog: true,
                    credentials: "${GIT_CREDENTIALS}"
                )
                sh '''
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
            agent {
                docker {
                    image 'node:8-alpine'
                    args ''
                }
            }
            steps {
                sh '''
                    yarn install
                    yarn build
                    tar -cvf build.tar build

                    ls -al
                    mv ./yarn.lock ${CACHE_DIR}
                    rm -rf ./node_modules
                    ls -al
                '''
                archiveArtifacts artifacts: 'build.tar', fingerprint: true
            }
        }
        stage('Deploy') {
            agent any
            steps {
                unarchive mapping: ['build.tar': 'build.tar']
                echo '--- Deploy ---'

                sshagent(["${SERVER_CREDENTIALSID}"]) {
                  sh "scp -o StrictHostKeyChecking=no build.tar root@${SERVER_IP_1}:${SERVER_DEPLOY_DIR}"
                  sh "ssh -o StrictHostKeyChecking=no root@${SERVER_IP_1} \"rm -rf ${SERVER_DEPLOY_DIR}build; tar -xvf ${SERVER_DEPLOY_DIR}build.tar -C ${SERVER_DEPLOY_DIR}\""
                }

            }
        }
    }
}
