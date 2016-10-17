/**
 * Created by lipeiwei on 16/10/17.
 */

import React, {PropTypes} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import commonStyle from '../style/commonStyle';
import {getNavigator} from '../route';
import * as Wechat from 'react-native-wechat';
import Toast from '../util/toast';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    margin: 15,
    flex: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 16,
    color: commonStyle.TEXT_GRAY_COLOR
  },
  image: {
    width: windowWidth,
    height: 50
  },
  splitView: {
    height: 1,
    width: windowWidth - 30,
    backgroundColor:
    commonStyle.GRAY_COLOR,
    marginTop: 10
  }
});

class SharePage extends React.Component {

  constructor() {
    super();
    this.shareToSession = this.shareToSession.bind(this);
    this.shareToTimeline = this.shareToTimeline.bind(this);
  }

  render() {
    return (
      <TouchableOpacity style={styles.touchableOpacityContainer} onPress={getNavigator().pop}>
        <View style={styles.container}>
          <Text style={styles.text}>分享 & 收藏</Text>
          <View style={styles.splitView}/>
          {this.renderTouchableOpacityImage(require('../image/wechat_fri.png'))}
          {this.renderTouchableOpacityImage(require('../image/wechat_moments.png'))}
          {this.renderTouchableOpacityImage(require('../image/copylink.png'))}
        </View>
      </TouchableOpacity>
    );
  }

  renderTouchableOpacityImage(imageSource, onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={{marginTop: 10}}>
        <Image style={styles.image} resizeMode="contain" source={imageSource} />
      </TouchableOpacity>
    );
  }

  shareToSession() {
    Wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          Wechat.shareToSession({type: 'text', description: '哈哈哈'})
            .catch((error) => {
              Toast.show(error.message);
            });
        } else {
          Toast.show('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }

  shareToTimeline() {

  }

}

SharePage.propTypes = {

};

export default SharePage;