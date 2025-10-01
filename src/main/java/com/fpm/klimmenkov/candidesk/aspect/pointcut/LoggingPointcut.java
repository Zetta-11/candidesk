package com.fpm.klimmenkov.candidesk.aspect.pointcut;

import org.aspectj.lang.annotation.Pointcut;

public class LoggingPointcut {

    @Pointcut("!within(com.fpm.klimmenkov.candidesk.service.LogService+) " +
            "&& !within(com.fpm.klimmenkov.candidesk.service.impl.LogServiceImpl+) " +
            "&& !within(com.fpm.klimmenkov.candidesk.service.impl.JwtService+) " +
            "&& (execution(* com.fpm.klimmenkov.candidesk.service..*.save*(..)) " +
            "|| execution(* com.fpm.klimmenkov.candidesk.service..*.create*(..)) " +
            "|| execution(* com.fpm.klimmenkov.candidesk.service..*.add*(..)))")
    public void createMethods() {
    }

    @Pointcut("execution(* com.fpm.klimmenkov.candidesk.service..*.update*(..)) " +
            "|| execution(* com.fpm.klimmenkov.candidesk.service..*.edit*(..))")
    public void updateMethods() {
    }

    @Pointcut("execution(* com.fpm.klimmenkov.candidesk.service..*.delete*(..)) " +
            "|| execution(* com.fpm.klimmenkov.candidesk.service..*.remove*(..))")
    public void deleteMethods() {
    }
}
