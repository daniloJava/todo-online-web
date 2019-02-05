import _ from 'lodash';

import { MomentHelper } from '@/helpers';

export default class Rules {

  public static ageRange: any = {
    type: 'string',
    pattern: /^([\d]{2})$|([\d]{2})\-([\d]{2})/,
    message: 'Intervalo de idade inválido (Ex.: 10-30).',
    trigger: 'blur',
  };

  public static email: any = {
    type: 'email', message: 'E-mail inválido.', trigger: ['blur', 'change'],
  };

  public static empty: any = {
    validator: (rule: any, value: any, callback: (value?: any) => void) => {
      if (_.isEmpty(value)) {
        callback(new Error('Este campo é obrigatório.'));

      } else {
        callback(undefined);
      }
    }, trigger: ['blur', 'change'],
  };

  public static maxYear: any = {
    validator: (rule: any, value: any, callback: (value?: any) => void) => {
      if (value && (!/^[0-9]+$/.test(value) || value.length !== 4)) {
        callback(new Error('Ano inválido.'));

      } else if (MomentHelper.isGreaterThanCurrentYear(value)) {
        callback(new Error('Ano não pode ser maior que o ano vigente.'));

      } else {
        callback(undefined);
      }
    }, trigger: ['blur', 'change'],
  };

  public static min: any = {
    type: 'string', min: 3, message: 'Mínimo de 3 caracteres.', trigger: ['blur', 'change'],
  };

  public static numeric: any = {
    validator: (rule: any, value: any, callback: (value?: any) => void) => {
      if (value && !/^[0-9]+$/.test(value)) {
        callback(new Error('Somente números são permitidos.'));

      } else {
        callback(undefined);
      }
    }, trigger: ['blur', 'change'],
  };

  public static numericAsteristico: any = {
    validator: (rule: any, value: any, callback: (value?: any) => void) => {
      if (value && !/^[0-9*]+$/.test(value)) {
        callback(new Error('Somente números são permitidos.'));

      } else {
        callback(undefined);
      }
    }, trigger: ['blur', 'change'],
  };

  public static required: any = {
    required: true, message: 'Este campo é obrigatório.', trigger: 'blur',
  };

  public static password(vm: any): any {
    const validate = (rule: any, value: any, callback: (value?: any) => void) => {
      if (!value) {
        callback(new Error('Este campo é obrigatório.'));

      } else {
        if (vm.model.passwordConfirm !== '') {
          vm.$refs.form.validateField('passwordConfirm');
        }

        callback();
      }
    };

    return { validator: validate, trigger: 'blur' };
  }

  public static passwordConfirm(vm: any) {
    const validate = (rule: any, value: any, callback: (value?: any) => void) => {
      if (!value) {
        callback(new Error('Este campo é obrigatório.'));

      } else {
        callback(value !== vm.model.password ? new Error('A senha não confere.') : undefined);
      }
    };

    return { validator: validate, trigger: 'blur' };
  }

  public static period(maxDays: number = 7): any {
    const validate = (rule: any, value: any, callback: (value?: any) => void) => {
      if (value && _.isArray(value) && value.length === 2 && value[0] && value[1]) {
        if (MomentHelper.isPeriodGreaterThan(value[0], value[1], maxDays)) {
          callback(new Error(`Período não pode ser superior a ${maxDays} dias.`));

        } else {
          callback(undefined);
        }

      } else {
        callback(undefined);
      }
    };

    return { validator: validate, trigger: ['blur', 'change'] };
  }

  public static historicoClear(vm: any): any {
    const validate = (rule: any, value: any, callback: (value?: any) => void) => {
      if ( !_.isEmpty(vm.filter.numero) && !_.isEmpty(vm.filter.ano) && !_.isEmpty(vm.filter.nomeDelegacia)) {
        vm.filter.historico = '';
      }
      callback(undefined);
    };
    return { validator: validate, trigger: ['blur'] };
  }

}
