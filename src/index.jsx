import '../style';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import assign from 'object-assign';
import injectLocale from '@gag/locale-provider-web/injectLocale';
import defaultLocale from '../locale/zh_CN';

class TimePicker extends React.Component {
  timePickerRef: any;

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
        'see: http://u.ant.design/time-picker-value',
      );
    }
    this.state = {
      value,
    };
  }

  //abstract getLocale()

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (value: moment.Moment) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange, format = 'HH:mm:ss' } = this.props;
    if (onChange) {
      onChange(value, (value && value.format(format)) || '');
    }
  }

  handleOpenClose = ({ open }) => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  }

  saveTimePicker = (timePickerRef) => {
    this.timePickerRef = timePickerRef;
  }

  focus() {
    this.timePickerRef.focus();
  }

  getDefaultFormat() {
    const { format, use12Hours } = this.props;
    if (format) {
      return format;
    } else if (use12Hours) {
      return 'h:mm:ss a';
    }
    return 'HH:mm:ss';
  }

  render() {
    const props = assign({}, this.props);
    delete props.defaultValue;

    const format = this.getDefaultFormat();
    const className = classNames(props.className, {
      [`${props.prefixCls}-${props.size}`]: !!props.size,
    });

    const addon = (panel) => (
      props.addon ? (
        <div className={`${props.prefixCls}-panel-addon`}>
          {props.addon(panel)}
        </div>
      ) : null
    );

    return (
      <RcTimePicker
        showHour={format.indexOf('HH') > -1 || format.indexOf('h') > -1}
        showMinute={format.indexOf('mm') > -1}
        showSecond={format.indexOf('ss') > -1}
        {...props}
        ref={this.saveTimePicker}
        format={format}
        className={className}
        value={this.state.value}
        placeholder={props.placeholder === undefined ? this.getLocale().placeholder : props.placeholder}
        onChange={this.handleChange}
        onOpen={this.handleOpenClose}
        onClose={this.handleOpenClose}
        addon={addon}
      />
    );
  }
}

const injectTimePickerLocale = injectLocale('TimePicker', defaultLocale);
TimePicker.defaultProps = {
  prefixCls: 'ant-time-picker',
  align: {
    offset: [0, -2],
  },
  disabled: false,
  disabledHours: undefined,
  disabledMinutes: undefined,
  disabledSeconds: undefined,
  hideDisabledOptions: false,
  placement: 'bottomLeft',
  transitionName: 'slide-up',
};
TimePicker.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([ 'default','large','small']),
  open: PropTypes.bool,
  format: PropTypes.string,
  onChange: PropTypes.func,
  onOpenChange:PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  hideDisabledOptions: PropTypes.bool,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  getPopupContainer: PropTypes.func,
  addon: PropTypes.func,
  use12Hours: PropTypes.bool,
};
TimePicker.displayName = "TimePicker";
export default injectTimePickerLocale(TimePicker);
