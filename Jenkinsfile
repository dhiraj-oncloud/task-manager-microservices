pipeline {
    agent any

    stages {

        // 1️⃣ Checkout the code from Git
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2️⃣ Node Build
        stage('Build') {
            steps {
                dir('user-service') {
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm ci'
                }
            }
        }

        // 3️⃣ Docker Build
        stage('Docker Build') {
            steps {
                dir('user-service') {
                    sh 'pwd'
                    sh 'ls -l'
                    sh 'docker build -t user-service:jenkins .'
                }
            }
        }

        // 4️⃣ Docker Run
        stage('Docker Run') {
            steps {
                dir('user-service') {
                    sh '''
                        docker rm -f user-service || true
                        docker run -d -p 3000:3000 --name user-service user-service:jenkins
                    '''
                }
            }
        }

        // 5️⃣ Docker Push to DockerHub
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    dir('user-service') {
                        sh '''
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            docker tag user-service:jenkins dhirajoncloud/user-service:latest
                            docker push dhirajoncloud/user-service:latest
                        '''
                    }
                }
            }
        }

        // 6️⃣ Test Stage
        stage('Test') {
            steps {
                dir('user-service') {
                    sh 'npm test || true'
                }
            }
        }
       stage('EC2 SSH Debug Test - detailed') {
  steps {
    // use sshUserPrivateKey to get a temporary key file for the build
    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEYFILE', usernameVariable: 'SSH_USER')]) {
      dir('.') {
        sh '''
          set -x
          echo "---- DEBUG: Environment details ----"
          echo "Jenkins user: $(whoami || true)"
          echo "SSH key file exists: $( [ -f "$SSH_KEYFILE" ] && echo yes || echo no )"
          ls -l "$SSH_KEYFILE" || true
          echo "---- Attempt SSH (verbose) ----"
          # attempt SSH and capture full verbose output to a file
          ssh -vvv -o StrictHostKeyChecking=no -i "$SSH_KEYFILE" ${SSH_USER}@34.224.23.112 "echo CONNECTED && hostname" > ssh_debug_out.txt 2>&1 || true
          echo "---- SSH raw debug output (start) ----"
          sed -n '1,400p' ssh_debug_out.txt || true
          echo "---- SSH raw debug output (end) ----"
          # also print exit code
          echo "SSH command exit code: $?"
        '''
      }
    }
  }
}




    }
}
