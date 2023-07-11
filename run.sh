INSTANCE_NAME=nobelium
WORKING_DIR=/app
DOCKER_IMAGE=nobelium:latest
NOTION_PAGE_ID=f6e6bca7e11b414bbbc96d596765c993
SCRIPT_TO_EXECUTE_IN_CONTAINER_SHELL="cd ${WORKING_DIR}; \
	bundle install; \
	${RUN_JEKYLL}; \
	exec \"\${SHELL:-sh}\""

docker stop $INSTANCE_NAME
docker rm $INSTANCE_NAME

docker run -d --name $INSTANCE_NAME \
	--volume="${PWD}:${WORKING_DIR}" \
	-p 3000:3000 \
	-e NOTION_PAGE_ID=${NOTION_PAGE_ID} \
	$DOCKER_IMAGE

