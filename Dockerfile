# BUILD STEP 1: Installing Dependency 
# >> Pull base image to use
FROM 138806120984.dkr.ecr.us-east-1.amazonaws.com/baseimage-node:latest as deps
# >> Define default directory
WORKDIR /frontend

# >> Define default directory
COPY package.json package-lock.json ./

# >> Install npm dependencies
RUN npm install --force


# BUILD STEP 2: Building Project
# >> Pull base image to use
FROM 138806120984.dkr.ecr.us-east-1.amazonaws.com/baseimage-node:latest as builder
# >> Define default directory
WORKDIR /frontend
# >> Copy the dependencies from the build step 1
COPY --from=deps /frontend/node_modules ./node_modules
# >> Copy all files 
COPY . .

# >> Copy all env configurations 
COPY .env.example .env


# >> Turn off nextjs telemetry to improve performance
ENV NEXT_TELEMETRY_DISABLED 1
# >> Build the project
RUN npm run build

# >> Delete the cache from .next folder since its no longer needed after the build
RUN rm -R .next/cache

# BUILD STEP 3: Setting up final docker image
# >> Pull base image to use
FROM 138806120984.dkr.ecr.us-east-1.amazonaws.com/baseimage-node:latest as runner
# >> Define default directory
WORKDIR /frontend
# >> Turn off nextjs telemetry to improve performance
ENV NEXT_TELEMETRY_DISABLED 1

# >> add user and user group (required when copying files from the .next folder)
RUN addgroup --system --gid 1001 devgroup
RUN adduser --system --uid 1001 dev

# >> copy all the needed files from build step 2
COPY --from=builder --chown=dev:devgroup /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next/standalone ./standalone
COPY --from=builder /frontend/.next/static ./.next/static
COPY --from=builder /frontend/.env ./
COPY --from=builder /frontend/next.config.js ./next.config.js

EXPOSE 3000

# >> define command to run upon initialization
ENTRYPOINT ["npm", "start"]