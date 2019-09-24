#! /bin/bash
# run sed search and replace commands
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_children_center/justify-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c-center/justify-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-c-c/justify-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c_c/justify-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_content-center/justify-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-content-center/justify-center/g' {} \;

LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_children_center/items-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_c-center/items-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v-c-c/items-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_c_c/items-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_content-center/items-center/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v-content-center/items-center/g' {} \;

LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_children_start/items-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_c-start/items-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v-c-s/items-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_c_s/items-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v_content-start/items-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/v-content-start/items-start/g' {} \;

LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_children_space-between/justify-between/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_children_space_between/justify-between/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c-space-between/justify-between/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c_space-between/justify-between/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_content_space_between/justify-between/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-content-space-between/justify-between/g' {} \;

LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_children_start/justify-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c-start/justify-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-c-s/justify-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c_s/justify-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_content-start/justify-start/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-content-start/justify-start/g' {} \;

LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_children_end/justify-end/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c-end/justify-end/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-c-s/justify-end/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_c_s/justify-end/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h_content-end/justify-end/g' {} \;
LC_ALL=C find ./content -type f -exec sed -i '' -e 's/h-content-end/justify-end/g' {} \;

#find . -type f -name "*.md" -i -e 's/v_c-center/items-center/g'
#find index.html -type f | xargs sed -i -e 's/http:\/\/dev-international\.cs\.sys/https:\/\/csweb-dev-fr\.cs\.sys/g'
#find index.html -type f | xargs sed -i -e 's/csweb-dev-fr\.cs\.sys/cs-staging-www\.crowdstrike\.fr/g'
#find index.html -type f | xargs sed -i -e 's/csweb-dev-fr\.cs\.sys/cs-staging-www\.crowdstrike\.fr/g'
