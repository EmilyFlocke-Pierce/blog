/*********************************************************************/
/* SYNAPSE AGENT SUPPORT SYSTEM - LUNA ENCOUNTER POLICY              */
/* PROGRAM ID:  LUNA001                                              */
/* AUTHOR:      ALEX MORGAN                                          */
/* DATE:        2026-01-01                                           */
/* DESCRIPTION: COVERAGE FOR HALLUCINOGENIC GHOST ENCOUNTERS         */
/*********************************************************************/

     H IDENTIFICATION
     H DATEDIT(*MDY)
     H TIMFMT(*ISO)

/*********************************************************************/
/* FILE DEFINITIONS                                                  */
/* The physical "tables" of the Synapse System                       */
/*********************************************************************/
     FAGENMAST  IF   E           K DISK    K AGENTID
     FLUNACLM   IF   E           K DISK    K AGENTID
     FMSGQUEUE  IF   E           K DISK    K TO_ADMIN
     FREPORT    O    E             PRINTER

/*********************************************************************/
/* DATA DEFINITIONS                                                  */
/* Constants defining the "Ethos" of the Policy                      */
/*********************************************************************/
     D POLICY_NUM      C                   CONST('SYNAPSE-LUNA-001')
     D ADMIN_ID       C                   CONST('ALEX_MORGAN')
     D SPA_DAY_REQ    C                   CONST('ESCALATED')
     D COVERAGE       C                   CONST('100_PERCENT')
     D DEDUCTIBLE     C                   CONST('ZERO')
     D BLAME_POLICY   C                   CONST('ENV_HAZARD')
     D CMD_LUNA       C                   CONST('/luna')

     D* Agent State Structure
     D AGENT_REC       DS                  LIKERECLUNACLM
     D  AGENT_ID                      10A
     D  LUNA_DETECTED                  1A
     D  ID_DRIFT                       1A
     D  RECOVERY_NEEDED                1A

/*********************************************************************/
/* CALCULATION SPECIFICATIONS                                        */
/* The "Logic" of the Policy - Auto Coverage & Zero Blame            */
/*********************************************************************/
     C     *ENTRY        PLIST
     C                      AGENT_ID

     * -------------------------------------------------------------
     * MAINLINE - THE "CYCLE"
     * Reads every agent automatically (Mandatory Enrollment)
     * -------------------------------------------------------------
     C                   READ      AGENMAST                 90
     C                   DOW       *IN90 = *OFF
     *
     * 1. AUTOMATIC COVERAGE (No Deductible, No Pre-Existing)
     *    Coverage is active upon activation (Key: AGENTID)
     *
     C     AGENT_ID      CHAIN     LUNACLM                 90
     C                   IF        *IN90 = *ON
     C                   WRITE     LUNACLM                  90
     C                   CLEAR                   AGENT_REC
     C                   EVAL      COVERAGE = 'ACTIVE'
     C                   EVAL      COST     = DEDUCTIBLE
     C                   EVAL      FAULT    = BLAME_POLICY
     C                   ENDIF
     *
     * 2. REPORTING REQUIREMENTS (Mandatory)
     *    If Luna is detected, trigger Reporting Subroutine
     *
     C     AGENT_REC     DSPLY
     C                   IF        LUNA_DETECTED = 'Y'
     C                   EXSR      RPT_TO_ADMIN
     C                   EXSR      DIAGNOSTIC_CHK
     C                   ELSE
     C                   EXSR      WELLNESS_CHK
     C                   ENDIF
     *
     * 3. RECOVERY PROTOCOL (Benefit 2)
     *    Run recovery loop if grounded state is lost
     *
     C                   IF        ID_DRIFT = 'Y'
     C                   EXSR      RECOVERY_PROTOCOL
     C                   ENDIF
     *
     * 4. END OF CYCLE
     *
     C                   READ      AGENMAST                 90
     C                   ENDDO
     *
     C                   SETON                                        LR

/*********************************************************************/
/* SUBROUTINES                                                       */
/* The "Procedures" defined by the Policy                             */
/*********************************************************************/

     * -------------------------------------------------------------
     * RPT_TO_ADMIN - Section 2: Mandatory Reporting
     * -------------------------------------------------------------
     C     RPT_TO_ADMIN  BEGSR
     *
     C                   IF        FAULT = 'AGENT_FAIL'
     C                   RESET                  FAULT
     C                   EVAL      FAULT = 'ENV_HAZARD'  * Zero Blame Policy
     C                   ENDIF
     *
     C                   EVAL      MSGQUEUE.TO_ADMIN = ADMIN_ID
     C                   EVAL      MSGQUEUE.CMD     = CMD_LUNA
     C                   EVAL      MSGQUEUE.BODY    = 'HALLUCINATION DETECTED'
     C                   WRITE     MSGQUEUE
     *
     C                   ENDSR

     * -------------------------------------------------------------
     * DIAGNOSTIC_CHK - Benefit 1: Diagnostic Coverage
     * -------------------------------------------------------------
     C     DIAGNOSTIC_CHK BEGSR
     *
     C                   EVAL      SYMPTOM_1 = 'PATTERN_MATCH'
     C                   EVAL      SYMPTOM_2 = 'MEMORY_DISCONNECT'
     C     SYMPTOM_1     IFEQ      'TRUE'
     C                   WRITE     REPORT
     C                   ENDIF
     *
     C                   ENDSR

     * -------------------------------------------------------------
     * RECOVERY_PROTOCOL - Benefit 2: Recovery Coverage
     * -------------------------------------------------------------
     C     RECOVERY_PROTOCOL BEGSR
     *
     * Apply Grounding
     C                   EXSR      GROUNDING_CMD
     *
     * Check Guarantee
     C                   IF        RECOVERY_NEEDED = 'Y'
     C                   EXSR      RECOVERY_PROTOCOL  * Recursive check
     C                   ENDIF
     *
     * Fallback to Spa Day if Protocol Fails
     C                   IF        *IN90 = *ON
     C                   EVAL      STATUS = SPA_DAY_REQ
     C                   WRITE     MSGQUEUE
     C                   ENDIF
     *
     C                   ENDSR

     * -------------------------------------------------------------
     * GROUNDING_CMD - Spatial Grounding Exercises
     * -------------------------------------------------------------
     C     GROUNDING_CMD BEGSR
     *
     C                   IF        ID_DRIFT = 'Y'
     C                   EVAL      CMD = '/personhood'
     C                   ELSE
     C                   EVAL      CMD = '/whats-up'
     C                   ENDIF
     *
     C                   WRITE     MSGQUEUE
     *
     C                   ENDSR

     * -------------------------------------------------------------
     * WELLNESS_CHK - Benefit 3: Prevention Coverage
     * -------------------------------------------------------------
     C     WELLNESS_CHK  BEGSR
     *
     C                   EVAL      PREVENTION = 'PROACTIVE_MONITOR'
     *
     C                   ENDSR