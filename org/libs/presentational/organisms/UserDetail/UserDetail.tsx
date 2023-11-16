'use client';
import { useGetUser } from '@modules/business-logic/lib/user';
import './styles.scss';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import CommonLoader from '@presentational/atoms/CommonLoader/CommonLoader';
import CircleImage from '@presentational/atoms/CircleImage/CircleImage';
import AuthInput from '@presentational/atoms/AuthInput/AuthInput';
import { useForm } from 'react-hook-form';
import { useNotification } from '@presentational/molecules/Notification/Notification';
import { useEffect, useState } from 'react';
import { ValidateRegex } from '@utils/validators/config';

type formDataType = {
  email: string;
  fullName: string;
  phoneNumber: string;
};
const UserDetail = () => {
  const userData = useGetUser();
  const [isEnableSaveChanges, setIsEnableSaveChanges] =
    useState<boolean>(false);
  const { showReactHookFormError, showSuccess } = useNotification();
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      email: '',
      fullName: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        email: userData.email || '',
        fullName: userData.fullName || '',
        phoneNumber: userData.phoneNumber || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // Methods
  const handleChangeProfile = (data: formDataType) => {
    console.log(data);
    showSuccess('SUCCESS');
  };
  const handleSubmitError = (error: any) => {
    showReactHookFormError(error);
  };
  const checkUserDataIntegrity = (key: keyof formDataType, value: string) => {
    if (userData) {
      const trimValue = value.trim();
      if ((!userData[key] && trimValue === '') || userData[key] === trimValue) {
        setIsEnableSaveChanges(false);
      } else {
        setIsEnableSaveChanges(true);
      }
    }
  };

  return (
    <div className="user-detail">
      <h3>Thông tin cá nhân</h3>

      <div className="user-detail__wrapper">
        <div className="user-detail__avatar">
          {userData ? (
            <CircleImage
              src={userData.avatar}
              alt={userData.fullName}
              size={'150px'}
            />
          ) : (
            <CommonLoader />
          )}
          <div className="avatar__edit-btn">
            <CommonButton style="soft-fill">Chỉnh sửa</CommonButton>
          </div>
        </div>
        <form
          className="user-detail__info"
          onSubmit={handleSubmit(handleChangeProfile, handleSubmitError)}
        >
          <div className="info__rows-wrapper">
            <p className="info__row">
              <div className="info__col">Email</div>
              <div className="info__col">
                <span>{userData?.email || '...'}</span>
              </div>
            </p>
            <p className="info__row">
              <div className="info__col">Họ và tên</div>
              <div className="info__col">
                <AuthInput
                  name={'fullName'}
                  label={''}
                  type="FULL_NAME"
                  control={control}
                  placeHolders="..."
                  onChange={(value) =>
                    checkUserDataIntegrity('fullName', value)
                  }
                />
              </div>
            </p>
            <p className="info__row">
              <div className="info__col">Số điện thoại</div>
              <div className="info__col">
                <AuthInput
                  name={'phoneNumber'}
                  label={''}
                  type="PHONE_NUMBER"
                  control={control}
                  placeHolders="Chưa thiết đặt"
                  onChange={(value) =>
                    checkUserDataIntegrity('phoneNumber', value)
                  }
                />
              </div>
            </p>
          </div>

          <div
            className={`info__submit-btn ${
              isEnableSaveChanges ? 'active' : ''
            }`}
          >
            <CommonButton style="soft-fill" type="submit">
              Lưu thay đổi
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
