/**
 * Created by lipeiwei on 16/10/2.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';
import commonStyle from '../style/commonStyle';
import Toast from '../util/toast';
import weekArray from '../constant/week';
import monthArray from '../constant/month';
import { parseDate } from '../util/dateUtil';
import BaseComponent from '../base/baseComponent';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  topViewContainer: {
    //怎么实现阴影,模糊边框
    borderWidth: 1,
    borderColor: commonStyle.GRAY_COLOR,
    padding: 10
  },
  contentImage: {
    height: 250
  },
  pictureInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pictureInfoText: {
    fontSize: 12,
    color: commonStyle.TEXT_GRAY_COLOR
  },
  content: {
    marginTop: 20,
    fontSize: 15,
    color: commonStyle.TEXT_COLOR
  },
  date: {
    marginTop: 30,
    fontSize: 14,
    color: commonStyle.TEXT_GRAY_COLOR,
    alignSelf: 'flex-end'
  },
  bottomViewContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'

  },
  smallIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  bottomText: {
    fontSize: 14,
    color: commonStyle.TEXT_GRAY_COLOR
  },
  shareImage: {
    position: 'absolute',
    right: 0,
  }
});

class PicturePage extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderTouchableBlock = this.renderTouchableBlock.bind(this);
    this.toEditDiary = this.toEditDiary.bind(this);
    this.praise = this.praise.bind(this);
    this.sharePicture = this.sharePicture.bind(this);
  }

  getNavigationBarProps() {
    return {
      hideNav: this.props.hideNav === undefined ? true : this.props.hideNav,
      hideLeftButton: false,
      hideRightButton: true,
      title: '图文',
      leftButtonImage: require('../image/return.png')
    };
  }

  renderBody() {
    var {data} = this.props;
    var date = parseDate(data.hp_makettime);
    var dateStr = weekArray[date.getDay()] + '  ' + date.getDate() + ' ' + monthArray[date.getMonth()] + '.' + date.getFullYear();
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.topViewContainer}>
            <Image style={styles.contentImage} source={{uri: data.hp_img_url}}/>
            <View style={styles.pictureInfoContainer}>
              <Text style={styles.pictureInfoText}>{data.hp_title}</Text>
              <Text style={styles.pictureInfoText}>{data.hp_author}</Text>
            </View>
            <Text style={styles.content}>{data.hp_content}</Text>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <View style={styles.bottomViewContainer}>
            {this.renderTouchableBlock(require('../image/diary.png'), '小记', this.toEditDiary)}
            {this.renderTouchableBlock(require('../image/laud.png'), data.praisenum, this.praise, {marginLeft: 120})}
            <TouchableOpacity style={styles.shareImage} activeOpacity={0} onPress={this.sharePicture}>
              <Image style={styles.smallIcon} source={require('../image/share_image.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  renderTouchableBlock(imageSource, text, onPress, style) {
    return (
      <TouchableOpacity style={[{flexDirection: 'row', alignItems: 'center'}, style]} activeOpacity={1} onPress={onPress}>
        <Image style={styles.smallIcon} source={imageSource}/>
        <Text style={styles.bottomText}>{text}</Text>
      </TouchableOpacity>
    );
  }

  toEditDiary() {
    //跳转到编辑页面
  }


  praise() {
    //点赞or取消点赞
  }

  sharePicture() {
    //分享
    Toast.show('分享');
  }

}

export default PicturePage;











