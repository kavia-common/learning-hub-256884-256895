#!/bin/bash
cd /home/kavia/workspace/code-generation/learning-hub-256884-256895/frontend_lms_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

