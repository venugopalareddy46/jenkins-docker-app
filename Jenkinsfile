pipeline {
    agent any
    environment {
        APP_NAME = 'jenkins-nodejs-app'
        APP_DIR = '/opt/jenkins-nodejs-app'
    }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Install Dependencies') { steps { sh 'npm install' } }
        stage('Test') { steps { sh 'npm test' } }
        stage('Build') {
            steps {
                sh 'echo "Building Node.js application..."'
                sh 'tar --exclude=node_modules -czf ${APP_NAME}.tar.gz app.js package.json  public'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    sudo mkdir -p ${APP_DIR}
                    sudo rm -rf ${APP_DIR}/public
                    sudo cp app.js package.json  ${APP_DIR}/
                    sudo cp -r public ${APP_DIR}/
                    cd ${APP_DIR}
                    sudo npm install --omit=dev
                    sudo pm2 delete ${APP_NAME} || true
                    sudo pm2 start app.js --name ${APP_NAME}
                    sudo pm2 save
                '''
            }
        }
        stage('Health Check') {
            steps {
                sh 'sleep 3'
                sh 'curl -fsS http://127.0.0.1:3000/health'
            }
        }
    }
    post {
        success { echo 'Jenkins CI/CD deployment completed successfully!' }
        failure { echo 'Jenkins CI/CD deployment failed.' }
        always { archiveArtifacts artifacts:'*.tar.gz', fingerprint:true, allowEmptyArchive:true }
    }
}