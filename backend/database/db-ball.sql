DROP TABLE IF EXISTS "public"."users";

/*==============================================================*/
/* Table: users                                                 */
/*==============================================================*/
create table users (
   id                   SERIAL               not null,
   openid               VARCHAR(225)         not null,
   user_name            VARCHAR(50)          COLLATE "default",
   nick_name            VARCHAR(50)          COLLATE "default",
   real_name            VARCHAR(50)          COLLATE "default",
   sex                  INT2                 null,
   age                  INT4                 null,
   email                VARCHAR(255)         COLLATE "default",
   avatar               VARCHAR(225)         COLLATE "default",
   mobile_phone         VARCHAR(50)          COLLATE "default",
   id_card              VARCHAR(50)          COLLATE "default",
   job                  VARCHAR(50)          COLLATE "default",
   wx_number            VARCHAR(50)          COLLATE "default",
   country              VARCHAR(50)          COLLATE "default",
   height               INT4                 null,
   weight               INT4                 null,
   star_sign            INT4                 null,
   skill_level          INT4                 null,
   about                VARCHAR(225)         COLLATE "default",
   password             VARCHAR(120)         COLLATE "default",
   created_at           TIMESTAMP            null,
   update_at            TIMESTAMP            null
) WITH (OIDS=FALSE);

COMMENT ON COLUMN "public"."users"."skill_level" IS '球技级别';
-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
ALTER TABLE "public"."users" ADD UNIQUE ("nick_name");
ALTER TABLE "public"."users" ADD UNIQUE ("user_name");
-- ----------------------------
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."users" ADD PRIMARY KEY ("id");



DROP TABLE IF EXISTS "public"."ball";
/*==============================================================*/
/* Table: ball                                                 */
/*==============================================================*/
create table ball (
   id                   SERIAL               not null,
   title                VARCHAR(225)         not null,
   image_url            VARCHAR(255)         COLLATE "default",
   ball_type            INT4                 null,
   address              VARCHAR(225)         COLLATE "default",
   status               INT4                 null,
   longitude            FLOAT8               null,
   latitude             FLOAT8               null,
   start_time           TIMESTAMP            null,
   end_time             TIMESTAMP            null,
   share_type           INT4                 null,
   price                DECIMAL(2)           not null,
   content              text                 COLLATE "default",
   user_id              INT4,
   qrcode               VARCHAR(255)         COLLATE "default",
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null,
   topic_id             INT4
) WITH (OIDS=FALSE);

COMMENT ON COLUMN "public"."ball"."share_type" IS '球局权限(1公开局 2仅自己可见 3仅好友可见)';
COMMENT ON COLUMN "public"."ball"."ball_type" IS '球局类别(1 4x4 2 3x3 3 5x5)';
-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."ball" ADD PRIMARY KEY ("id");
ALTER TABLE "public"."ball" alter column ball_type set default 1;



DROP TABLE IF EXISTS "public"."ball_sign";
/*==============================================================*/
/* Table: ball_sign                                            */
/*==============================================================*/
create table ball_sign (
   ball_id              INT4                 not null,
   user_id              INT4                 not null,
   sign_status          INT4                 null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null
) WITH (OIDS=FALSE);
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."ball_sign" ADD PRIMARY KEY ("ball_id", "user_id");
CREATE INDEX "idx_ball_users" ON "ball_sign" ("ball_id");


DROP TABLE IF EXISTS "public"."topic_focus";

/*==============================================================*/
/* Table: topic_focus                                           */
/*==============================================================*/
create table topic_focus (
   user_id              INT4                 not null,
   topic_id             INT4                 not null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null
) WITH (OIDS=FALSE);
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."topic_focus" ADD PRIMARY KEY ("topic_id", "user_id");
CREATE INDEX "idx_topic_focus" ON "topic_focus" ("topic_id");



DROP TABLE IF EXISTS "public"."users_focus";
/*==============================================================*/
/* Table: users_focus                                            */
/*==============================================================*/
create table users_focus (
   user_id              INT4                 not null,
   focus_user_id        INT4                 not null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null
) WITH (OIDS=FALSE);
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."users_focus" ADD PRIMARY KEY ("user_id", "focus_user_id");
CREATE INDEX "idx_user_focus" ON "users_focus" ("user_id");


DROP TABLE IF EXISTS "public"."topic";
/*==============================================================*/
/* Table: "topic(话题表)"                                          */
/*==============================================================*/
create table "topic" (
   id                   SERIAL               not null,
   name                 VARCHAR(50)          COLLATE "default",
   type                 INT4                 null,
   content              VARCHAR(255)         COLLATE "default",
   user_id              INT4                 null,
   "order"              INT8                 null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null
) WITH (OIDS=FALSE);

COMMENT ON COLUMN "public"."topic"."type" IS '话题分类 (0无分类 1球局 2比赛)';
-- ----------------------------
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."topic" ADD PRIMARY KEY ("id");
ALTER TABLE "public"."topic" alter column type set default 0;



DROP TABLE IF EXISTS "public"."speaking_topic";
/*==============================================================*/
/* Table: speaking_topic                                        */
/*==============================================================*/
create table topic_speaking (
   topic_id             INT4                 not null,
   speaking_id          INT4                 not null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null,
   "order"              INT8                 null
) WITH (OIDS=FALSE);
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."topic_speaking" ADD PRIMARY KEY ("topic_id", "speaking_id");
CREATE INDEX "idx_topic_speaking" ON "topic_speaking" ("topic_id");



DROP TABLE IF EXISTS "public"."speaking";
/*==============================================================*/
/* Table: speaking                                              */
/*==============================================================*/
create table speaking (
   id                   SERIAL               not null,
   image_url            VARCHAR(255)         COLLATE "default",
   content              VARCHAR(2048)        COLLATE "default",
   longitude            FLOAT8               null,
   latitude             FLOAT8               null,
   address              VARCHAR(255)         COLLATE "default",
   user_id              INT4                 null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null,
   status               INT4                 null
) WITH (OIDS=FALSE);

COMMENT ON COLUMN "public"."speaking"."status" IS '球话状态 (0未审核 1审核通过)';
-- ----------------------------
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."speaking" ADD PRIMARY KEY ("id");
ALTER TABLE "public"."speaking" alter column status set default 1;



DROP TABLE IF EXISTS "public"."comment";
/*==============================================================*/
/* Table: comment                                               */
/*==============================================================*/
create table comment (
   id                   SERIAL               not null,
   p_id                 INT4,
   content              VARCHAR(255)         COLLATE "default",
   images               jsonb                null,
   speaking_id          INT4,
   user_id              INT4,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null
);
COMMENT ON COLUMN "public"."comment"."p_id" IS '评论父id';
-- ----------------------------
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."comment" ADD PRIMARY KEY ("id");
ALTER TABLE "public"."comment" alter column p_id set default 0;

CREATE INDEX "idx_comment" ON "comment" ("speaking_id");


DROP TABLE IF EXISTS "public"."favorite";
/*==============================================================*/
/* Table: favorite                                              */
/*==============================================================*/
create table favorite (
   id                   SERIAL               not null,
   speaking_id          INT4                 null,
   user_id              INT4                 null,
   create_at            TIMESTAMP            null,
   update_at            TIMESTAMP            null
);
-- ----------------------------
-- Primary Key structure for table vul_task
-- ----------------------------
ALTER TABLE "public"."favorite" ADD PRIMARY KEY ("id");
CREATE INDEX "idx_favorite" ON "favorite" ("speaking_id");
